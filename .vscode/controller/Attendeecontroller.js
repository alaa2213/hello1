import AttendeeModel from "../models/AttendeeModel.js";
export const getAttendeeById= async(req,res)=>{
    const attendee = await AttendeeModel.findById(params.id);
    res.status(200).json({ attendee })
    console.log('Attendee = ', attendee);

}
export const DeleteAttendee=async(req,res)=>{
    const attendee = await AttendeeModel.findById(params.id);
    res.status(200).json({ attendee })
}
export const getAttendees=async(req,res)=>{
    const attendees = await AttendeeModel.find();
    res.status(200).json({ attendees })
}