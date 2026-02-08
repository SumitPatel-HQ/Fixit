"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Send, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClarifyingQuestionsProps {
   questions: string[];
   mainMessage?: string;
   onSubmit: (selectedOption: string) => void;
   isLoading?: boolean;
}

export function ClarifyingQuestions({
   questions,
   mainMessage,
   onSubmit,
   isLoading,
}: ClarifyingQuestionsProps) {
   const [selectedOption, setSelectedOption] = useState<string | null>(null);

   const handleSubmit = () => {
      if (selectedOption) {
         onSubmit(selectedOption);
      }
   };

   // Parse questions to get option labels (A, B, C...) if they follow a pattern
   const options = questions.map((q, i) => ({
      label: String.fromCharCode(65 + i), // A, B, C...
      text: q,
   }));

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="flex items-center justify-center min-h-[400px]"
      >
         <Card className="max-w-lg w-full border-amber-500/30 bg-amber-950/10">
            <CardHeader className="text-center pb-4">
               <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-amber-400" />
               </div>
               <CardTitle className="text-xl text-white">
                  I Need More Information
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* Main Message */}
               {mainMessage && (
                  <p className="text-center text-white/70">{mainMessage}</p>
               )}

               {/* Options */}
               <div className="space-y-3">
                  {options.map((option) => (
                     <motion.button
                        key={option.label}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedOption(option.text)}
                        className={`
                  w-full p-4 rounded-xl text-left transition-all duration-200
                  flex items-start gap-3
                  ${selectedOption === option.text
                              ? "bg-accent/20 border-2 border-accent"
                              : "bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20"
                           }
                `}
                     >
                        <span
                           className={`
                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                    text-sm font-bold
                    ${selectedOption === option.text
                                 ? "bg-accent text-white"
                                 : "bg-white/10 text-white/70"
                              }
                  `}
                        >
                           {option.label}
                        </span>
                        <span className="text-white/90 leading-relaxed">
                           {option.text}
                        </span>
                        {selectedOption === option.text && (
                           <ChevronRight className="w-5 h-5 text-accent ml-auto flex-shrink-0" />
                        )}
                     </motion.button>
                  ))}
               </div>

               {/* Submit Button */}
               <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!selectedOption || isLoading}
               >
                  {isLoading ? (
                     <span className="flex items-center gap-2">
                        <motion.span
                           animate={{ rotate: 360 }}
                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                           className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Processing...
                     </span>
                  ) : (
                     <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Choice
                     </span>
                  )}
               </Button>
            </CardContent>
         </Card>
      </motion.div>
   );
}
