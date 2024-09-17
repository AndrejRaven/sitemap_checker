interface UploadStatusProps {
  isUploaded: boolean;
}

export default function UploadStatus({ isUploaded }: UploadStatusProps) {
  if (!isUploaded) return null;

  return (
    <p className="mt-2 text-green-600">Links have been successfully added!</p>
  );
}