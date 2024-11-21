import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configure AWS with your access and secret key.
const s3 = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload an image to S3
const uploadImageToS3 = async (file: File): Promise<string> => {
  const bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("VITE_AWS_S3_BUCKET_NAME is not defined");
  }

  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const imageUrl = `https://${bucketName}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${file.name}`;
    console.log(`File uploaded successfully at ${imageUrl}`);
    return imageUrl;
  } catch (err: any) {
    console.error(`Error uploading file: ${err.message}`);
    throw err;
  }
};

export { uploadImageToS3 };