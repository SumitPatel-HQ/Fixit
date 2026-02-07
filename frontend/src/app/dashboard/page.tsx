'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CameraCapture } from '@/components/input-hub/CameraCapture';
import { FileUpload } from '@/components/input-hub/FileUpload';
import { VoiceInput } from '@/components/input-hub/VoiceInput';
import { useDashboard } from './dashboard-context';

type InputMode = 'camera' | 'upload';
type QueryMode = 'voice' | 'text';

interface DeviceHint {
   type: string;
   brand: string;
   model: string;
}

const EXAMPLE_QUERIES = [
   'Where is the RAM?',
   'How to fix paper jam?',
   'What are these LED lights?',
   'Locate the reset button',
];

const DEVICE_TYPES = [
   'Router',
   'Printer',
   'Laptop',
   'Arduino',
   'Desktop PC',
   'Smartphone',
   'Tablet',
   'Other',
];

export default function InputHubPage() {
   const router = useRouter();
   const { isMobileMenuOpen } = useDashboard();

   // Visual input state
   const [inputMode, setInputMode] = useState<InputMode>('upload');
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [showCamera, setShowCamera] = useState(false);

   // Query input state
   const [queryMode, setQueryMode] = useState<QueryMode>('text');
   const [queryText, setQueryText] = useState('');

   // Device hint state
   const [showDeviceHint, setShowDeviceHint] = useState(false);
   const [deviceHint, setDeviceHint] = useState<DeviceHint>({
      type: '',
      brand: '',
      model: '',
   });

   // Form state
   const [errors, setErrors] = useState<{ image?: string; query?: string }>({});
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Handlers
   const handleCameraCapture = (file: File) => {
      setSelectedFile(file);
      setShowCamera(false);
      setInputMode('upload');
      setErrors({ ...errors, image: undefined });
   };

   const handleFileSelect = (file: File) => {
      setSelectedFile(file);
      setErrors({ ...errors, image: undefined });
   };

   const handleFileRemove = () => {
      setSelectedFile(null);
   };

   const handleVoiceTranscript = (text: string) => {
      setQueryText(text);
      setErrors({ ...errors, query: undefined });
   };

   const handleExampleClick = (example: string) => {
      setQueryText(example);
      setQueryMode('text');
      setErrors({ ...errors, query: undefined });
   };

   const validateForm = (): boolean => {
      const newErrors: { image?: string; query?: string } = {};

      if (!selectedFile) {
         newErrors.image = 'Please upload an image of your device';
      }

      if (!queryText.trim()) {
         newErrors.query = 'Please describe the issue or ask a question';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async () => {
      if (!validateForm()) {
         return;
      }

      setIsSubmitting(true);

      try {
         // Prepare form data
         const formData = new FormData();
         formData.append('image', selectedFile!);
         formData.append('query', queryText);

         // Add device hint if provided
         if (deviceHint.type || deviceHint.brand || deviceHint.model) {
            formData.append('device_hint', JSON.stringify(deviceHint));
         }

         // Make API request
         const response = await fetch('/api/troubleshoot', {
            method: 'POST',
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Failed to submit troubleshooting request');
         }

         const data = await response.json();

         // Navigate to results page
         router.push(`/results/${data.sessionId}`);
      } catch (error) {
         console.error('Submission error:', error);
         alert('Failed to submit request. Please try again.');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="space-y-8 max-w-8xl mx-auto">
         {/* Page Header */}
         <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-foreground">
               Device Troubleshooting
            </h1>
            <p className="text-muted-foreground text-lg">
               Upload an image and describe your issue to get instant AI-powered assistance
            </p>
         </div>

         {/* Visual Input Section */}
         <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
               <h2 className="text-xl font-display font-semibold text-foreground">
                  Upload Device Image or Video
               </h2>

               {/* Mode Toggle */}
               <div className="flex gap-2 p-1 bg-secondary rounded-lg self-start md:self-auto">
                  <button
                     onClick={() => {
                        setInputMode('camera');
                        setShowCamera(true);
                     }}
                     className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all
                ${inputMode === 'camera' && showCamera
                           ? 'bg-accent text-white shadow-lg'
                           : 'text-muted-foreground hover:text-foreground'
                        }
              `}
                  >
                     📸 Capture Live
                  </button>
                  <button
                     onClick={() => {
                        setInputMode('upload');
                        setShowCamera(false);
                     }}
                     className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all
                ${inputMode === 'upload' && !showCamera
                           ? 'bg-accent text-white shadow-lg'
                           : 'text-muted-foreground hover:text-foreground'
                        }
              `}
                  >
                     📁 Upload File
                  </button>
               </div>
            </div>

            {/* Camera or Upload Component */}
            {showCamera ? (
               <CameraCapture
                  onCapture={handleCameraCapture}
                  onCancel={() => {
                     setShowCamera(false);
                     setInputMode('upload');
                  }}
               />
            ) : (
               <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemove={handleFileRemove}
               />
            )}

            {/* Error Message */}
            {errors.image && (
               <p className="text-sm text-red-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.image}
               </p>
            )}
         </div>

         {/* Query Input Section */}
         <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
               What's the issue?
            </h2>

            {/* Query Mode Tabs */}
            <div className="flex gap-2 border-b border-border">
               <button
                  onClick={() => setQueryMode('voice')}
                  className={`
              px-4 py-2 font-medium transition-all relative
              ${queryMode === 'voice'
                        ? 'text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                     }
            `}
               >
                  Voice Input
                  {queryMode === 'voice' && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
               </button>
               <button
                  onClick={() => setQueryMode('text')}
                  className={`
              px-4 py-2 font-medium transition-all relative
              ${queryMode === 'text'
                        ? 'text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                     }
            `}
               >
                  Text Input
                  {queryMode === 'text' && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
               </button>
            </div>

            {/* Query Input Content */}
            {queryMode === 'voice' ? (
               <VoiceInput onTranscript={handleVoiceTranscript} currentText={queryText} />
            ) : (
               <div className="space-y-4">
                  <textarea
                     value={queryText}
                     onChange={(e) => {
                        setQueryText(e.target.value);
                        setErrors({ ...errors, query: undefined });
                     }}
                     placeholder="Describe the problem or ask a question..."
                     className="w-full min-h-[120px] p-4 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                     maxLength={500}
                  />

                  {/* Character Counter */}
                  <div className="flex justify-between items-center">
                     <p className="text-xs text-muted-foreground">
                        {queryText.length} / 500 characters
                     </p>
                  </div>

                  {/* Example Queries */}
                  <div className="space-y-2">
                     <p className="text-sm text-muted-foreground">Quick examples:</p>
                     <div className="flex flex-wrap gap-2">
                        {EXAMPLE_QUERIES.map((example) => (
                           <button
                              key={example}
                              onClick={() => handleExampleClick(example)}
                              className="px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-sm text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all"
                           >
                              {example}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* Error Message */}
            {errors.query && (
               <p className="text-sm text-red-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.query}
               </p>
            )}
         </div>

         {/* Optional Device Hint Section */}
         <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
            <button
               onClick={() => setShowDeviceHint(!showDeviceHint)}
               className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
            >
               <span className="font-medium text-foreground">Advanced Options</span>
               <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform ${showDeviceHint ? 'rotate-180' : ''
                     }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
            </button>

            {showDeviceHint && (
               <div className="px-6 pb-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                     Providing device details improves accuracy
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* Device Type */}
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                           Device Type
                        </label>
                        <select
                           value={deviceHint.type}
                           onChange={(e) => setDeviceHint({ ...deviceHint, type: e.target.value })}
                           className="w-full px-4 py-2 bg-secondary/30 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                           <option value="">Select type</option>
                           {DEVICE_TYPES.map((type) => (
                              <option key={type} value={type.toLowerCase()}>
                                 {type}
                              </option>
                           ))}
                        </select>
                     </div>

                     {/* Brand */}
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                           Brand (Optional)
                        </label>
                        <input
                           type="text"
                           value={deviceHint.brand}
                           onChange={(e) => setDeviceHint({ ...deviceHint, brand: e.target.value })}
                           placeholder="e.g., HP, Dell, Cisco"
                           className="w-full px-4 py-2 bg-secondary/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                     </div>

                     {/* Model */}
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                           Model (Optional)
                        </label>
                        <input
                           type="text"
                           value={deviceHint.model}
                           onChange={(e) => setDeviceHint({ ...deviceHint, model: e.target.value })}
                           placeholder="e.g., XPS 15, RT-AC68U"
                           className="w-full px-4 py-2 bg-secondary/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Submit Button - Fixed on Mobile */}
         <div className={cn(
            "fixed bottom-6 left-6 right-6 z-50 md:static md:p-0 md:m-0",
            isMobileMenuOpen ? "hidden md:block" : "block"
         )}>
            <Button
               onClick={handleSubmit}
               disabled={isSubmitting || !selectedFile || !queryText.trim()}
               size="lg"
               className="w-full h-14 text-base font-semibold rounded-full shadow-2xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-90"
            >
               {isSubmitting ? (
                  <>
                     <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                     </svg>
                     Analyzing your device...
                  </>
               ) : !selectedFile || !queryText.trim() ? (
                  'Select image and enter query'
               ) : (
                  <>
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                     Analyze & Troubleshoot
                  </>
               )}
            </Button>
         </div>
      </div>
   );
}
