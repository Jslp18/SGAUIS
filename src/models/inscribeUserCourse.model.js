import { Schema, model } from "mongoose"

const inscribeUserCourseSchema = new Schema({
    usuarios: {
        ref: 'Users',
        require: true,
        type: Schema.Types.ObjectId
    },
    curso: {
        ref: 'Courses',
        require: true,
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('inscribeUsersCourse', inscribeUserCourseSchema)