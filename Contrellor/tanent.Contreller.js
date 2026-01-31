const Tenant = requrie("../model/tanant.js");
const User = require("../model/UserModel");

const { email, password, tenantSlug } = req.body

if (!email || !password || !tenantSlug) {
    res.status(400).json({
        massage: " pelese provide email password slug "
    })
}; 

const tenant = await Tenant.findOne({ slug: tenantSlug })

if (!tenant) return res.status(404).json({ message: "tenant not found "})

const user = await User.findOne({
    tenantId: tenant._id,
    userEmail: email
})

if (!user) return res.status(400).json({ message: "user not found" })


    res.status(400).json({
        massage :""
    })
