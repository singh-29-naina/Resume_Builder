// import jwt from "jsonwebtoken";

// const protect = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized"
//             });
//         }

//         const token = authHeader.split(" ")[1];

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.userId = decoded.userId;

//         next();

//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid or Expired Token"
//         });
//     }
// };

// export default protect;



import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("No Authorization Header");
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        req.userId = decoded.userId;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
};

export default protect;