"use client";

import { PageHero } from "@/components/ui/PageHero";
import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

export default function MortgageCalculatorPage() {
    const [homePrice, setHomePrice] = useState<number>(450000);
    const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
    const [loanTerm, setLoanTerm] = useState<number>(30);
    const [interestRate, setInterestRate] = useState<number>(6.5);
    const [propertyTax, setPropertyTax] = useState<number>(5400); // Annual
    const [homeInsurance, setHomeInsurance] = useState<number>(1200); // Annual
    const [hoaFees, setHoaFees] = useState<number>(0); // Monthly

    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

    useEffect(() => {
        // Principal and Interest
        const principal = homePrice - (homePrice * (downPaymentPct / 100));
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        let pi = 0;
        if (monthlyRate === 0) {
            pi = principal / numberOfPayments;
        } else {
            pi = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        // Taxes, Insurance, HOA
        const monthlyTax = propertyTax / 12;
        const monthlyInsurance = homeInsurance / 12;
        const total = pi + monthlyTax + monthlyInsurance + hoaFees;

        setMonthlyPayment(total);
    }, [homePrice, downPaymentPct, loanTerm, interestRate, propertyTax, homeInsurance, hoaFees]);

    const downPaymentAmount = homePrice * (downPaymentPct / 100);

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="Mortgage Calculator"
                description="Estimate your monthly payments and see how much home you can afford."
                imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-6xl">

                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Left: Input Controls */}
                        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Calculator className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-slate-900">Loan Details</h3>
                            </div>

                            {/* Home Price */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-700">Home Price</label>
                                    <span className="font-bold text-slate-900">${homePrice.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="50000" max="3000000" step="10000"
                                    value={homePrice}
                                    onChange={(e) => setHomePrice(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                            </div>

                            {/* Down Payment */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-sm font-medium text-slate-700">Down Payment</label>
                                    <span className="font-bold text-slate-900">${downPaymentAmount.toLocaleString()} ({downPaymentPct}%)</span>
                                </div>
                                <div className="flex gap-2 mb-4">
                                    {[3, 5, 10, 20].map((pct) => (
                                        <button
                                            key={pct}
                                            onClick={() => setDownPaymentPct(pct)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${downPaymentPct === pct ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                        >
                                            {pct}%
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="range"
                                    min="0" max="100" step="1"
                                    value={downPaymentPct}
                                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                            </div>

                            {/* Loan Term & Interest */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Loan Program</label>
                                    <select
                                        value={loanTerm}
                                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 appearance-none bg-slate-50"
                                    >
                                        <option value={30}>30-Year Fixed</option>
                                        <option value={20}>20-Year Fixed</option>
                                        <option value={15}>15-Year Fixed</option>
                                        <option value={10}>10-Year Fixed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Interest Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 bg-slate-50"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-8 mt-8">
                                <h4 className="font-bold text-slate-900 mb-6">Estimated Monthly Expenses</h4>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-2">Property Tax / Year</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                            <input
                                                type="number"
                                                value={propertyTax}
                                                onChange={(e) => setPropertyTax(Number(e.target.value))}
                                                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary bg-slate-50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-2">Home Ins. / Year</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                            <input
                                                type="number"
                                                value={homeInsurance}
                                                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                                                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary bg-slate-50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-2">HOA Fees / Mo.</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                            <input
                                                type="number"
                                                value={hoaFees}
                                                onChange={(e) => setHoaFees(Number(e.target.value))}
                                                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary bg-slate-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Results Breakdown */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden text-white shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />

                                <h3 className="text-lg font-medium text-slate-300 mb-2">Estimated Monthly Payment</h3>
                                <div className="text-5xl font-heading font-bold mb-8">
                                    ${Math.round(monthlyPayment).toLocaleString()}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                            <span className="text-slate-300">Principal & Interest</span>
                                        </div>
                                        <span className="font-bold">${Math.round(monthlyPayment - (propertyTax / 12) - (homeInsurance / 12) - hoaFees).toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-400" />
                                            <span className="text-slate-300">Property Taxes</span>
                                        </div>
                                        <span className="font-bold">${Math.round(propertyTax / 12).toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-purple-400" />
                                            <span className="text-slate-300">Home Insurance</span>
                                        </div>
                                        <span className="font-bold">${Math.round(homeInsurance / 12).toLocaleString()}</span>
                                    </div>

                                    {hoaFees > 0 && (
                                        <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                                <span className="text-slate-300">HOA Fees</span>
                                            </div>
                                            <span className="font-bold">${hoaFees.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                    <h4 className="font-bold text-white mb-2">Need Pre-Approval?</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                        Take the next step in your home buying journey. Connect with our trusted local lending partners to get pre-approved today.
                                    </p>
                                    <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-100 transition-colors">
                                        Get Pre-Approved
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
