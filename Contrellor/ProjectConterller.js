const Project =require("../model/ProjectModel")



exports.projectCrate = async (req,res )=>{
    const { owner, members, status } = req.body

try{
    if (!owner|| !members|| !status) {
        return res.status(400).json({
            message: "please provide owner, members, status"
        })
    }

    const project = await Project.create({
        owner, 
        members,
         status
    })

    return res.status(201).json({
        message: "product create successfully",
        data: productCreate
    })
}
    catch (error) {
        console.error('Create product error:', error)
        return res.status(400).json({
            message: error.message || "Failed to create product"
        })
    }



    
}

exports.getProject= async (req, res) => {
    // const productReviews = await Review.find().populate("userId")
    const Project = await Project.find()

    if (Project.length === 0) {
        res.status(400).json({
            message: "Project is not found"
        })
    } else {
        res.status(200).json({
            message: "product fetch successfully",
            data: products,
            // review: productReviews
        })
    }

}
