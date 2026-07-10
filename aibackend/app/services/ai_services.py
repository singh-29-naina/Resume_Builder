import os
from dotenv import load_dotenv
from typing import TypedDict

from pydantic import BaseModel, Field

from langgraph.graph import StateGraph, START, END

from langchain_groq import ChatGroq

load_dotenv()

# =====================================================
# LLM
# =====================================================

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

# =====================================================
# Structured Output Models
# =====================================================

class KeywordOutput(BaseModel):
    keyword_score: int = Field(..., ge=0, le=100)
    matched_skills: list[str]
    missing_skills: list[str]


class ATSOutput(BaseModel):
    ats_score: int = Field(..., ge=0, le=100)
    strengths: list[str]
    weaknesses: list[str]


class ExperienceOutput(BaseModel):
    experience_score: int = Field(..., ge=0, le=100)
    strengths: list[str]
    weaknesses: list[str]


class SuggestionOutput(BaseModel):
    suggestions: list[str]


# =====================================================
# State
# =====================================================

class ResumeState(TypedDict):

    resume: str
    jd: str

    keyword_score: int
    ats_score: int
    experience_score: int

    matched_skills: list[str]
    missing_skills: list[str]

    ats_strengths: list[str]
    ats_weaknesses: list[str]

    experience_strengths: list[str]
    experience_weaknesses: list[str]

    strengths: list[str]
    weaknesses: list[str]

    suggestions: list[str]

    overall_score: float


# =====================================================
# Keyword Node
# =====================================================

keyword_llm = llm.with_structured_output(KeywordOutput)

def keyword_node(state: ResumeState):

    prompt = f"""
You are an ATS Keyword Analyzer.

Compare Resume with Job Description.

Return:

- keyword_score (0-100)
- matched_skills
- missing_skills

Resume:

{state["resume"]}

Job Description:

{state["jd"]}
"""

    result = keyword_llm.invoke(prompt)

    return {
        "keyword_score": result.keyword_score,
        "matched_skills": result.matched_skills,
        "missing_skills": result.missing_skills
    }


# =====================================================
# ATS Node
# =====================================================

ats_llm = llm.with_structured_output(ATSOutput)

def ats_node(state: ResumeState):

    prompt = f"""
You are an ATS Resume Reviewer.

Evaluate:

- Resume formatting
- Headings
- Sections
- Readability
- ATS compatibility

Resume:

{state["resume"]}
"""

    result = ats_llm.invoke(prompt)

    return {
        "ats_score": result.ats_score,
        "ats_strengths": result.strengths,
        "ats_weaknesses": result.weaknesses
    }


# =====================================================
# Experience Node
# =====================================================

experience_llm = llm.with_structured_output(ExperienceOutput)

def experience_node(state: ResumeState):

    prompt = f"""
You are a Technical Recruiter.

Evaluate:

- Projects
- Experience
- Technical Skills
- Achievements

Compare Resume with JD.

Resume:

{state["resume"]}

Job Description:

{state["jd"]}
"""

    result = experience_llm.invoke(prompt)

    return {
        "experience_score": result.experience_score,
        "experience_strengths": result.strengths,
        "experience_weaknesses": result.weaknesses
    }


# =====================================================
# Suggestion Node
# =====================================================

suggestion_llm = llm.with_structured_output(SuggestionOutput)

def suggestion_node(state: ResumeState):

    prompt = f"""
You are an Expert Resume Coach.

Matched Skills:

{state["matched_skills"]}

Missing Skills:

{state["missing_skills"]}

ATS Strengths:

{state["ats_strengths"]}

ATS Weaknesses:

{state["ats_weaknesses"]}

Experience Strengths:

{state["experience_strengths"]}

Experience Weaknesses:

{state["experience_weaknesses"]}

Give practical resume improvement suggestions.
"""

    result = suggestion_llm.invoke(prompt)

    return {
        "suggestions": result.suggestions
    }


# =====================================================
# Final Report
# =====================================================

def final_report(state: ResumeState):

    overall = round(
        (
            state["keyword_score"] +
            state["ats_score"] +
            state["experience_score"]
        ) / 3,
        2
    )

    strengths = (
        state["ats_strengths"] +
        state["experience_strengths"]
    )

    weaknesses = (
        state["ats_weaknesses"] +
        state["experience_weaknesses"]
    )

    return {
        "overall_score": overall,
        "strengths": strengths,
        "weaknesses": weaknesses
    }


# =====================================================
# Build Graph
# =====================================================

graph = StateGraph(ResumeState)

graph.add_node("Keyword", keyword_node)
graph.add_node("ATS", ats_node)
graph.add_node("Experience", experience_node)
graph.add_node("Suggestions", suggestion_node)
graph.add_node("Final", final_report)

graph.add_edge(START, "Keyword")
graph.add_edge(START, "ATS")
graph.add_edge(START, "Experience")

graph.add_edge("Keyword", "Suggestions")
graph.add_edge("ATS", "Suggestions")
graph.add_edge("Experience", "Suggestions")

graph.add_edge("Suggestions", "Final")

graph.add_edge("Final", END)

workflow = graph.compile()


# =====================================================
# Test
# =====================================================

def analyze_resume(resume_text: str, jd: str):

    result = workflow.invoke(
        {
            "resume": resume_text,
            "jd": jd
        }
    )

    return {
        "overall_score": result["overall_score"],
        "keyword_score": result["keyword_score"],
        "ats_score": result["ats_score"],
        "experience_score": result["experience_score"],
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "strengths": result["strengths"],
        "weaknesses": result["weaknesses"],
        "suggestions": result["suggestions"]
    }

    # final_output = {
    #     "overall_score": result["overall_score"],
    #     "keyword_score": result["keyword_score"],
    #     "ats_score": result["ats_score"],
    #     "experience_score": result["experience_score"],
    #     "matched_skills": result["matched_skills"],
    #     "missing_skills": result["missing_skills"],
    #     "strengths": result["strengths"],
    #     "weaknesses": result["weaknesses"],
    #     "suggestions": result["suggestions"]
    # }

    # from pprint import pprint

    # print("\n========== AI Resume Analysis ==========\n")
    # pprint(final_output)