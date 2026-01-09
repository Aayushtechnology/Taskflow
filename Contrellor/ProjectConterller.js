const Project = require("../model/ProjectModel");

exports.createProject = async (req, res) => {
    try {
        const { title, description, owner } = req.body;

        if (!owner || !title || !description) {
            return res.status(400).json({
                message: "please provide owner, title and description"
            });
        }

        const project = await Project.create({
            owner,
            title,
            description
        });

        return res.status(201).json({
            message: "Project created successfully",
            data: project   // ✅ correct variable
        });

    } catch (error) {
        console.error("Create project error:", error);
        return res.status(500).json({
            message: error.message || "Failed to create project"
        });
    }
};







exports.getProject = async (req, res) => {
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

exports.getsingleproject = async (req, res) => {

    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            message: "please provide project  id"
        })
    }


    const product = await Project.find({ _id: id })

    // const productReviews = await Review.find({ productId: id }).populate("userId")

    if (product == 0) {
        return res.status(400).json({
            message: "project is not found with this id"
        })
    }
    return res.status(200).json({
        message: "single projectis fetch successfully",
        data: product,
        // productReviews
    })



}

exports.deleteproject = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            message: "please provide project id"
        })
    }

    const prevdata = await Project.findById(id);

    if (!prevdata) {
        return res.status(400).json({
            message: "no product found with that id"
        })
    }


    await Product.findByIdAndDelete(id)

    res.status(200).json({
        message: "project is delete successfully",
        data: prevdata
    })
}
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const { owner, members, status } = req.body

        if (!owner || !members || !status) {
            return res.status(400).json({
                message: "please provide owner, members, status"
            })
        }


        // // Normalize productStatus to lowercase and validate
        // const normalizedStatus = productStatus.toLowepredataimagerCase().trim()
        // if (normalizedStatus !== 'active' && normalizedStatus !== 'inactive') {
        //     return res.status(400).json({
        //         message: "prodStatus must be either 'active' or 'inactive'"
        //     })
        // }

        res.status(200).json({
            message: "project update successfully",
            data: datas
        })
        const predata = await Project.findById(id)
        if (!predata) {
            return res.status(404).json({
                message: "Project not found"
            })
        }


        const datas = await Project.findByIdAndUpdate(id, {
            owner,
            title,
            description
        }, { new: true, runValidators: true })
    } catch (error) {
        console.error('Update product error:', error)
        return res.status(400).json({
            message: error.message || "Failed to update product"
        })
    }
}