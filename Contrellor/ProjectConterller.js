const Project =require("../model/ProjectModel")



exports.projectCrate = async (req,res )=>{
    const { owner, members, status } = req.body

try{
    if (!owner|| !members|| !status) {
        return res.status(400).json({
            message: "please provide owner, members, status"
        })
    }

    const Project = await project.create({
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