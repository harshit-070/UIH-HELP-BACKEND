import mongoose, { Schema, Document } from "mongoose";


const date = new Date();
const app_id = "";
const issuer_address = "";
const version = 1;
const standard = "arc69";
const external_url = "https://www.appsloveworld.com/mongodb/100/109/mongoose-schema-for-nested-json-and-store-it-node-js";



export interface IGraduateCert {
  standard: string;
  properties: {
    student_id: string;
    student_name: string;
    grade: string;
    course: string;
    app_id: string;
    issuer_address: string;
    date_created: string;
  };
  version: number;
  external_url: string;
  image: string;
  description: string;
}

export interface IGraduateCertModel extends IGraduateCert, Document { }


const GraduateCertSchema: Schema = new Schema({
  standard: { type: String, default: standard },
  properties: {
    student_id: { type: String, required: true },
    student_name: { type: String, required: true },
    grade: { type: String, required: true },
    course: { type: String, required: true },
    app_id: { type: String, default: app_id },
    issuer_address: { type: String, default: issuer_address },
    date_created: { type: String, default: date.toDateString() },
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  external_url: { type: String, default: external_url },
  version: { type: Number, default: version }
});

export default mongoose.model < IGraduateCertModel > (
  "GraduateCertData",
  GraduateCertSchema
);