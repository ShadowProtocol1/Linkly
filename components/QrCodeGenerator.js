import { useRef } from "react";

const QrCodeGenerator = () => {
  const canvasRef = useRef(null);

  const generateQRCode = (input) => {
    const size = 21; // Version 1 QR Code (21x21 modules)
    const moduleSize = 10; // Pixel size of each module
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size * moduleSize;
    canvas.height = size * moduleSize;

    // Initialize QR matrix
    const qrMatrix = initializeMatrix(size);

    // Place finder patterns
    placeFinderPatterns(qrMatrix);

    // Encode data
    const dataBits = encodeData(input, size);

    // Add error correction (simplified)
    const errorBits = generateErrorCorrection(dataBits);

    // Place data bits into the QR matrix
    placeData(qrMatrix, dataBits.concat(errorBits));

    // Apply a simple mask
    applyMask(qrMatrix);

    // Draw the QR code
    drawMatrix(qrMatrix, ctx, moduleSize);
  };

  const initializeMatrix = (size) => {
    const matrix = [];
    for (let i = 0; i < size; i++) {
      matrix.push(new Array(size).fill(null)); // Unassigned modules
    }
    return matrix;
  };

  const placeFinderPatterns = (matrix) => {
    const patterns = [
      [0, 0],
      [0, matrix.length - 7],
      [matrix.length - 7, 0],
    ];
    patterns.forEach(([row, col]) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const isOuter = i === 0 || i === 6 || j === 0 || j === 6;
          const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
          matrix[row + i][col + j] = isOuter || isInner ? 1 : 0;
        }
      }
    });
  };

  const encodeData = (input, size) => {
    const binary = [];
    binary.push(0b0100); // Byte mode indicator (4 bits)
    binary.push(input.length.toString(2).padStart(8, "0")); // Length (8 bits)
    for (let i = 0; i < input.length; i++) {
      binary.push(input.charCodeAt(i).toString(2).padStart(8, "0")); // ASCII to binary
    }
    const totalDataBits = (size - 1) * (size - 1);
    while (binary.join("").length < totalDataBits) {
      binary.push("11101100", "00010001"); // Padding bits
    }
    return binary.join("").split("").map(Number);
  };

  const generateErrorCorrection = (dataBits) => {
    const parity = dataBits.reduce((sum, bit) => sum ^ bit, 0);
    return [parity, parity];
  };

  const placeData = (matrix, dataBits) => {
    let direction = -1;
    let row = matrix.length - 1;
    let col = matrix.length - 1;
    let bitIndex = 0;

    while (col > 0) {
      if (col === 6) col--; // Skip the timing pattern
      for (let i = 0; i < matrix.length; i++) {
        const r = direction > 0 ? row - i : row + i;
        if (matrix[r] && matrix[r][col] === null) {
          matrix[r][col] = dataBits[bitIndex++] || 0;
          if (bitIndex >= dataBits.length) return;
        }
      }
      col--;
      direction *= -1; // Switch direction
    }
  };

  const applyMask = (matrix) => {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] !== null) {
          matrix[row][col] ^= (row + col) % 2 === 0 ? 1 : 0; // Simple mask
        }
      }
    }
  };

  const drawMatrix = (matrix, ctx, moduleSize) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        ctx.fillStyle = matrix[row][col] ? "#000000" : "#ffffff";
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  };

  const handleGenerateClick = () => {
    const input = document.getElementById("textInput").value;
    if (input) {
      generateQRCode(input);
    } else {
      alert("Please enter text or a URL!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>QR Code Generator</h1>
      <input type="text" id="textInput" placeholder="Enter text or URL" />
      <button onClick={handleGenerateClick}>Generate QR Code</button>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default QrCodeGenerator;
