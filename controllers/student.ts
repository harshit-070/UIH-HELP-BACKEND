/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import graduateCertSchema from "../model/student";
import { json, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { request } from "http";
//certificate template html
const produceCertificateTemplate = (student_name:string, course:string) => {
  const certificateTemplate = `
      <div width ="1000px" class="main-container">
          <h1 class="cert-title">Certificate of Achievement </h1>
          <h4 class="cert-reason"> THIS IS HEREBY GRANTED TO: </h4>
          <p class="holder-name "> <a href="#" class="holder-link"> ${student_name}</a> </p>
          <hr class="holder-ruler" />
          <p class="achievement"> FOR COMPLETING THE ${course} COURSE WITH THE
              SMART LEARNING</p>
          <p class="signature"> <a href="#" class="signature-link">TLOTLISO MOKATI </a></p>
          <hr class="signature-ruler" />
          <p class="ceo-name"> Joon Lee </p>
          <p class="ceo-job">CEO and Founder</p>
      </div>
  `;

  return certificateTemplate;
};
//certicate template style
const styles = `
.main-container {
  position: absolute;
  width: 700px;
  height: 600px;
  background: #FFFFFF;
}

.side-section-blue {
  position: absolute;
  width: 240px;
  height: 600px;
  left: 0px;
  top: 0px;
}

.logo {
  position: absolute;
  width: 313px;
  height: 78px;
  left: 290px;
  top: 38px;
  background: url(aca-logo.png);
}

.cert-title {
  position: absolute;
  width: 600px;
  height: 56px;
  left: 192px;
  top: 158px;
  font-family: 'Alex Brush';
  font-style: normal;
  font-weight: 400;
  font-size: 45px;
  line-height: 56px;
  display: flex;
  align-items: center;
  color: #002E94;
}

.cert-reason {
  position: absolute;
  width: 300px;
  left: 192px;
  top: 222px;
  font-family: 'Rajdhani';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  align-items: center;
  color: #002E94;
}

.holder-name {
  position: absolute;
  max-width: 400px;
  height: 46px;
  left: 192px;
  top: 253px;
  font-family: 'Zen Antique';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 46px;
  display: flex;
  align-items: center;
  color: #002E94;
}

.holder-link {
  text-decoration: none;
  color: #002E94;
  width: 500px;
}

.holder-ruler {
  position: absolute;
  width: 375px;
  height: 0px;
  left: 192px;
  top: 320px;
  border: 1px solid #0049DC;
}

.achievement {
  position: absolute;
  width: 480px;
  height: 38px;
  left: 192px;
  top: 341px;
  font-family: 'Rajdhani';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #002E94;

}

.signature {
  position: absolute;
  width: 150px;
  height: 30px;
  left: 404px;
  top: 485px;
  font-family: 'My Soul';
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #000000;
}

.signature-link {
  color: #000000;
  text-decoration: none;
  width: 300px;
}

.signature-ruler {
  position: absolute;
  width: 120px;
  height: 0px;
  left: 386px;
  top: 535px;
  border: 1px solid #0049DC;

}

.ceo-name {
  position: absolute;
  width: 150px;
  height: 20px;
  left: 411px;
  top: 539px;
  font-family: 'Rajdhani';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #002E94;
}

.ceo-job {
  position: absolute;
  width: 100px;
  height: 15px;
  left: 392px;
  top: 559px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #002E94;
}

`;

//function to create an image
// async function createImage(student_name) {
//   const payload = { html: produceCertificateTemplate(student_name),
//   css: styles, full_screen: true, viewport_width:1000, viewport_height:600};

//   const headers = { auth: {
//     //later move to env variables
//       username: '94dee078-f6c8-4399-adc5-36b7cb813795',
//       password: '60c949b3-c320-485a-b9c8-cc5bf5c8aace'
//   },
//   headers: {
//     'Content-Type': 'application/json'
//   }
//   }
//   try {
//     const response = await axios.post('https://hcti.io/v1/image/?dl=1', JSON.stringify(payload), headers);
//     const url_ = response.data.url;
//     console.log(response.data);
//     return url_;

//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

const addGraduateCertData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { student_id } = req.body.properties;
  const { student_name } = req.body.properties;
  const { grade } = req.body.properties;
  const { course } = req.body.properties;
  const { app_id } = req.body.properties;
  const { issuer_address } = req.body.properties;
  const { date_created } = req.body.properties;
  const { version } = req.body;
  const { standard } = req.body;
  const description = `Certificate of completion of the ${course}`;
  const { external_url } = req.body;
  let image: any = null;

  const payload = {
    html: produceCertificateTemplate(student_name, course),
    css: styles,
    full_screen: true,
    viewport_width: 1000,
    viewport_height: 600,
  };

  const headers = {
    auth: {
      //later move to env variables
      username: "94dee078-f6c8-4399-adc5-36b7cb813795",
      password: "60c949b3-c320-485a-b9c8-cc5bf5c8aace",
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      "https://hcti.io/v1/image/?dl=1",
      JSON.stringify(payload),
      headers
    );
    const url_ = response.data.url;
    console.log(url_);
    image = response.data.url;
  } catch (error) {
    console.error(error);
  }

  const certData = new graduateCertSchema({
    _id: new mongoose.Types.ObjectId(),
    standard,
    properties: {
      student_id,
      student_name,
      grade,
      course,
      app_id,
      issuer_address,
      date_created,
    },
    image,
    description,
    external_url,
    version,
  });

  const fetchGraduateData = await graduateCertSchema.findOne(
    { "properties.student_id": student_id },
    { "properties.course": 1, _id: 0 }
  );

  if (fetchGraduateData) {
    res
      .status(400)
      .send(course,
        "You cannot not enrol the same student using the same student Id on the same course twice"
      );
  } else if (!(student_id && student_name && grade && course)) {
    res.status(400).send("All input fields are required");
  } else {
    return certData
      .save()
      .then((certData) => res.status(201).json({ certData }))
      .catch((error) => res.status(500).json({ error }));
  }
};

const displayGraduateData = async (req: Request, res: Response) => {
  const Id = req.params.student_id;

  const fetchGraduateData = await graduateCertSchema.findOne(
    { "properties.student_id": Id },
    {
      standard: 1,
      "properties.student_id": 1,
      "properties.student_name": 1,
      "properties.grade": 1,
      "properties.course": 1,
      description: 1,
      image: 1,
      external_url: 1,
      version: 1,
      _id: 0,
    }
  );
  if (!fetchGraduateData) {
    res.status(404).send("Student Id does not exist");
  } else {
    res.status(200).send(fetchGraduateData);
  }
};

const retrieveMetadata = async (req: Request, res: Response) => {
  const Id = req.params.student_id;

  const fetchGraduateMetadata = await graduateCertSchema.findOne(
    { "properties.student_id": Id },
    { "properties.student_name": 1, "properties.app_id": 1, _id: 0 }
  );
  if (!fetchGraduateMetadata) {
    res.status(404).send("Student Id does not exist");
  } else {
    res.status(200).send(fetchGraduateMetadata);course;
  }
};

const StudentCertData = async (req: Request, res: Response) => {
  const certData = await graduateCertSchema.find(
    {},
    {
      "properties.student_id": 1,
      "properties.student_name": 1,
      "properties.grade": 1,
      "properties.course": 1,
      "properties.app_id": 1,
      _id: 0,
    }
  );
  if (!certData) {
    res.status(404).send("Data is not found");
  } else {
    res.status(200).send(certData);
  }
};

const updateStudentData = async (req: Request, res: Response) => {
  const Id = req.params.student_id;

  const { app_id } = req.body;
  const { issuer_address } = req.body;

  const studentData = await graduateCertSchema.findOneAndUpdate(
    { "properties.student_id": Id },
    { "properties.app_id": app_id, "properties.issuer_address": issuer_address }
  );

  if (!studentData) {
    res.status(404).send("Student Id does not exist");
  } else {
    res.status(200).send("Data updated Successfully");
  }
};

export default {
  addGraduateCertData,
  displayGraduateData,
  retrieveMetadata,
  StudentCertData,
  updateStudentData,
};
