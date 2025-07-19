'use client'
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Terms() {
  const router = useRouter();
  const goBack = () => {
    router.back(); // Goes back one page in history
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
          <button
            onClick={goBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Terms and Conditions</h1>
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/30 shadow-2xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300 mb-6">
              By accessing and using SariSend wallet application, you accept and
              agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-green-400">
              2. Use License
            </h2>
            <p className="text-gray-300 mb-6">
              Permission is granted to temporarily use SariSend for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to reverse engineer any software contained in SariSend
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-4 text-green-400">
              3. Wallet Security
            </h2>
            <p className="text-gray-300 mb-6">
              You are responsible for maintaining the confidentiality of your
              wallet credentials, including private keys, seed phrases, and
              passwords. SariSend will not be liable for any loss or damage
              arising from your failure to protect your credentials.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-green-400">
              4. Transaction Risks
            </h2>
            <p className="text-gray-300 mb-6">
              Cryptocurrency transactions are irreversible. You acknowledge that
              SariSend cannot reverse, cancel, or refund any transactions once
              they are confirmed on the blockchain. You are solely responsible
              for verifying transaction details before confirmation.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-green-400">
              5. Disclaimer
            </h2>
            <p className="text-gray-300 mb-6">
              The materials on SariSend are provided on an 'as is' basis.
              SariSend makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-green-400">
              6. Limitations
            </h2>
            <p className="text-gray-300 mb-6">
              In no event shall SariSend or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use SariSend, even if SariSend or a SariSend
              authorized representative has been notified orally or in writing
              of the possibility of such damage.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-green-400">
              7. Governing Law
            </h2>
            <p className="text-gray-300 mb-6">
              These terms and conditions are governed by and construed in
              accordance with the laws of the jurisdiction where SariSend
              operates, and you irrevocably submit to the exclusive jurisdiction
              of the courts in that state or location.
            </p>

            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl">
              <p className="text-green-400 font-medium mb-2">Last Updated</p>
              <p className="text-gray-300">
                These terms were last updated on December 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}