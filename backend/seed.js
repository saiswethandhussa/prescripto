import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from './models/doctorModel.js';
import path from 'path';

dotenv.config();

// Config Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// Default doctor details (mapped to local asset filenames)
const defaultDoctors = [
    { name: 'Dr. Ramesh Kumar', image: 'doc1.png', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Ramesh Kumar is committed to providing comprehensive medical care with a strong focus on preventive medicine and early diagnosis.', fees: 50, address: { line1: '12th Cross, Indiranagar', line2: 'Bengaluru, Karnataka' } },
    { name: 'Dr. Anjali Sharma', image: 'doc2.png', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Dr. Anjali Sharma specializes in women’s health and provides compassionate and personalized care.', fees: 60, address: { line1: 'Sector 18', line2: 'Noida, Uttar Pradesh' } },
    { name: 'Dr. Priya Nair', image: 'doc3.png', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', about: 'Dr. Priya Nair focuses on skin care treatments using modern dermatological techniques.', fees: 30, address: { line1: 'MG Road', line2: 'Kochi, Kerala' } },
    { name: 'Dr. Arjun Mehta', image: 'doc4.png', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Dr. Arjun Mehta provides specialized healthcare services for infants and children.', fees: 40, address: { line1: 'Navrangpura', line2: 'Ahmedabad, Gujarat' } },
    { name: 'Dr. Suresh Rao', image: 'doc5.png', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Suresh Rao treats neurological disorders with a patient-first approach.', fees: 50, address: { line1: 'Banjara Hills', line2: 'Hyderabad, Telangana' } },
    { name: 'Dr. Karthik Iyer', image: 'doc6.png', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Karthik Iyer specializes in advanced neurological care and diagnostics.', fees: 50, address: { line1: 'Adyar', line2: 'Chennai, Tamil Nadu' } },
    { name: 'Dr. Sunita Verma', image: 'doc7.png', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Sunita Verma provides holistic treatment and preventive healthcare.', fees: 50, address: { line1: 'Lajpat Nagar', line2: 'New Delhi' } },
    { name: 'Dr. Neha Gupta', image: 'doc8.png', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Dr. Neha Gupta is dedicated to women’s wellness and maternity care.', fees: 60, address: { line1: 'Civil Lines', line2: 'Jaipur, Rajasthan' } },
    { name: 'Dr. Pooja Kulkarni', image: 'doc9.png', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', about: 'Dr. Pooja Kulkarni provides effective solutions for skin and hair problems.', fees: 30, address: { line1: 'Kothrud', line2: 'Pune, Maharashtra' } },
    { name: 'Dr. Rohit Singh', image: 'doc10.png', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Dr. Rohit Singh offers reliable pediatric healthcare services.', fees: 40, address: { line1: 'Alambagh', line2: 'Lucknow, Uttar Pradesh' } },
    { name: 'Dr. Manish Joshi', image: 'doc11.png', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Manish Joshi has extensive experience in treating neurological conditions.', fees: 50, address: { line1: 'MP Nagar', line2: 'Bhopal, Madhya Pradesh' } },
    { name: 'Dr. Nitin Desai', image: 'doc12.png', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Nitin Desai focuses on accurate diagnosis and long-term care.', fees: 50, address: { line1: 'Satellite Area', line2: 'Surat, Gujarat' } },
    { name: 'Dr. Kavita Malhotra', image: 'doc13.png', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Kavita Malhotra emphasizes preventive healthcare and patient education.', fees: 50, address: { line1: 'Model Town', line2: 'Ludhiana, Punjab' } },
    { name: 'Dr. Sanjay Patil', image: 'doc14.png', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Dr. Sanjay Patil provides advanced gynecological treatments.', fees: 60, address: { line1: 'Nashik Road', line2: 'Nashik, Maharashtra' } },
    { name: 'Dr. Aishwarya Reddy', image: 'doc15.png', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', about: 'Dr. Aishwarya Reddy offers modern skincare solutions.', fees: 30, address: { line1: 'Whitefield', line2: 'Bengaluru, Karnataka' } }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully.");

        // Clear existing empty or broken records
        await doctorModel.deleteMany({});
        console.log("Cleared old doctor records.");

        const salt = await bcrypt.genSalt(10);
        const defaultPasswordHash = await bcrypt.hash('doctorpassword123', salt);

        for (const doc of defaultDoctors) {
            console.log(`Uploading image for ${doc.name}...`);
            
            // Resolve the path to the frontend assets folder containing the images
            const imagePath = path.resolve('../frontend/src/assets', doc.image);

            // Upload image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(imagePath, { resource_type: 'image' });
            
            const doctorData = {
                name: doc.name,
                email: `${doc.name.toLowerCase().replace(/[^a-z]/g, '')}@prescripto.com`,
                password: defaultPasswordHash,
                image: uploadResult.secure_url, // Saves the Cloudinary url!
                speciality: doc.speciality,
                degree: doc.degree,
                experience: doc.experience,
                about: doc.about,
                fees: doc.fees,
                address: doc.address,
                date: Date.now()
            };

            const newDoc = new doctorModel(doctorData);
            await newDoc.save();
            console.log(`Successfully added ${doc.name} with Cloudinary Image!`);
        }

        console.log("Database seeded successfully!");
        await mongoose.disconnect();
    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

seed();
