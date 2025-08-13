"use client";
import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./components/ui/card/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CardHeader } from "./components/ui/card/card-header";
import { CardTitle } from "./components/ui/card/card-title";
import { CardContent } from "./components/ui/card/card-content";

export default function QRGeneratorPage() {
  const [url, setUrl] = useState("");
  const [qrData, setQrData] = useState<string>("");

  const generateQR = async () => {
    if (!url.trim()) return;
    try {
      const data = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: "H", // کیفیت بالاتر
      });
      setQrData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    if (!qrData) return;
    const a = document.createElement("a");
    a.href = qrData;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border-none bg-white/80 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold text-gray-800 text-center">
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Paste your link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-gray-100 placeholder-gray-400 focus:bg-white transition-colors"
            />
            <Button
              onClick={generateQR}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Generate
            </Button>
          </div>

          <AnimatePresence>
            {qrData && (
              <motion.div
                key="qr-code"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <div className="inline-block p-4 rounded-2xl bg-white/90 shadow-xl">
                  <Image
                    src={qrData}
                    alt="QR Code"
                    width={280}
                    height={280}
                    unoptimized
                    className="rounded-xl"
                  />
                </div>
                <Button
                  variant="success"
                  onClick={downloadQR}
                  className="mt-5 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Download QR
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
