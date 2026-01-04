// components/operations/cards/CalculationInfoModal.tsx

'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getConfigVersion } from '@/config/emissions-factors';
import type { CalculationFactor } from '@/lib/emissions/types';

interface CalculationInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  methodology: string;
  factors: CalculationFactor[];
}

export function CalculationInfoModal({
  isOpen,
  onClose,
  title,
  methodology,
  factors,
}: CalculationInfoModalProps) {
  const configVersion = getConfigVersion();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
          {/* Methodology */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-600 mb-2">
              Calculation Formula
            </h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-mono text-sm text-slate-700 break-words">
                {methodology}
              </p>
            </div>
          </div>
          
          {/* Emission Factors Table */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-600 mb-2">
              Emission Factors Used
            </h4>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-slate-600">Factor</th>
                    <th className="text-left p-3 font-medium text-slate-600">Value</th>
                    <th className="text-left p-3 font-medium text-slate-600">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {factors.map((factor, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 text-slate-700">{factor.name}</td>
                      <td className="p-3 font-mono text-slate-900">
                        {factor.value} <span className="text-slate-500">{factor.unit}</span>
                      </td>
                      <td className="p-3 text-slate-500 text-xs">{factor.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Config Version */}
          <div className="text-xs text-slate-400 border-t pt-4">
            <p>Emission Factors Version: {configVersion.version}</p>
            <p>Last Updated: {configVersion.lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

