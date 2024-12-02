import { useEffect, useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({inputValue, shortUrl}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Generate the QR code whenever the inputValue changes
  useEffect(() => {
    if (inputValue) {
      generateQRCode(inputValue);
    }
  }, [inputValue]);

  // Function to generate QR code
  const generateQRCode = async (input) => {
    try {
      // Generate QR code as Data URL (base64-encoded PNG)
      const qrCodeDataUrl = await QRCode.toDataURL(input, {
        errorCorrectionLevel: "H", // High error correction level (most robust)
        type: "image/png", // Output format
        margin: 4, // Margin around the QR code
        width: 200, // Set the width of the QR Code (200px)
      });

      setQrCodeUrl(qrCodeDataUrl); // Set the generated QR Code as the image URL
    } catch (error) {
      console.error("Error generating QR code: ", error);
    }
  };

  return (
    <div>
      {inputValue ? (
        <>
          <h3 className="p-0 font-bold text-xl">Generated QR Code</h3>
          {/* QR Code container with hover effect */}
          {qrCodeUrl && (
            <div className="qr-code-container relative">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="qr-code-image mt-8"
              />
              <div className="overlay-download">
                <a
                  href={qrCodeUrl} // The URL of the QR code image
                  download={`${shortUrl}.png`} // The name of the file to download
                  className="download-button-container"
                >
                  <button className="download-button download-btn"><i className="fas fa-download"></i> {/* Download Icon */}</button>
                </a>
              </div>
            </div>
          )}

        </>
      ) : (
        <p>Please provide some text or URL as input to generate a QR code.</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
