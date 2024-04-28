import { Schema, model } from "mongoose"

const inscribeUserCourseSchema = new Schema({
    users: {
        ref: 'Users',
        require: true,
        type: Schema.Types.ObjectId
    },
    courses: {
        ref: 'Courses',
        require: true,
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('inscribeUsersCourse', inscribeUserCourseSchema)