'use client';

import { cn } from '@/utils/class-names';

interface Step {
    title: string;
    description?: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

export default function Stepper({ steps, currentStep, className }: StepperProps) {
    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                            {/* Step Circle */}
                            <div
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                                    {
                                        'border-blue bg-blue text-white': index <= currentStep,
                                        'border-gray-300 bg-white text-gray-500': index > currentStep,
                                    }
                                )}
                            >
                                {index < currentStep ? (
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            {/* Step Title */}
                            <div className="mt-2 text-center">
                                <p
                                    className={cn('text-sm font-medium', {
                                        'text-blue': index <= currentStep,
                                        'text-gray-500': index > currentStep,
                                    })}
                                >
                                    {step.title}
                                </p>
                                {step.description && (
                                    <p className="text-xs text-gray-500">{step.description}</p>
                                )}
                            </div>
                        </div>
                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    'mx-4 h-0.5 w-16 transition-colors sm:w-24 md:w-32',
                                    {
                                        'bg-blue': index < currentStep,
                                        'bg-gray-300': index >= currentStep,
                                    }
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}