// controller for enhancing a resumes professional summary

import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import { PDFParse } from "pdf-parse";
//POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async(req ,res)=>{
    try {
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message:"Please upload a resume."})
        }
       const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. your task is to enhance the professional summary of a resume.the summary should be 1-2 sentences also highlighting key skills,experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


// controller for enhancing a resumes job description
//POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async(req ,res)=>{
    try {
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message:'Missing required fields'})
        }
       const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. your task is to enhance the job description of a resume.the job desription should be 1-2 sentences also highlighting key responsibilities and achievements.Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
export const projectSummary = async(req ,res)=>{
    try {
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message:'Missing required fields'})
        }
       const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. your task is to enhance the project summary of a resume.the project summary should be 1-2 sentences also highlighting key responsibilities and achievements.Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

// controller for uploading a resume to the database
//POST: /api/ai/upload-resume
export const uploadResume = async(req ,res)=>{
    try {
        const {title} = req.body;
        const userId = req.userId;
        const file = req.file;
        if(!file){
            return res.status(400).json({message:'Missing required fields'})
        }

        const parser = new PDFParse({
            data: file.buffer
        });

        const result = await parser.getText();

        const resumeText = result.text;

        await parser.destroy();

        console.log("Extracted Resume Text:", resumeText);
        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        // const pdfData = await pdf(file.buffer);
        // const resumeText = pdfData.text;
        const userPrompt =  `Extract all information from the following resume:${resumeText} Return ONLY a valid JSON object matching the following schema:
        
        {
            professional_summary:{
                type:String,
                default:''
            },
            skills:[{
                type:String,
                default:''
            }],
            personal_info:{
                image:{
                    type:String,
                    default:'',
        
                },
                full_name:{
                    type:String,
                    default:''
                },
                profession:{
                    type:String,
                    default:''
                },
                email:{
                    type:String,
                    default:''
                },
                phone:{
                    type:String,
                    default:''
                },
                location:{
                    type:String,
                    default:''
                },
                linkedin:{
                    type:String,
                    default:''
                },
                website:{
                    type:String,
                    default:''
                },
            },
            experience:[
                {
                    company:{type:String},
                    position:{type:String},
                    start_date:{type:String},
                    end_date:{type:String},
                    description:{type:String},
                    is_current:{type:Boolean},
                }
            ],
            project:[
                {
                    name:{type:String},
                    type:{type:String},
                    description:{type:String},
                }
            ],
            education:[
                {
                    institution:{type:String},
                    degree:{type:String},
                    field:{type:String},
                    graduation_date:{type:String},
                    gpa:{type:String},
                    
                }
            ],
        }
        
        
        `
       const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: systemPrompt 
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format:{type:'json_object'}
        })

        const extractedData= response.choices[0].message.content;
        let parsedData;
        try {
            parsedData = JSON.parse(extractedData);
        } catch (parseError) {
            console.error("AI returned non-JSON content:", extractedData);
            return res.status(502).json({ message: "AI failed to extract resume data. Please try again." });
        }
        const newResume = await Resume.create({userId,title,...parsedData})
        return res.json({resumeId:newResume._id})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}