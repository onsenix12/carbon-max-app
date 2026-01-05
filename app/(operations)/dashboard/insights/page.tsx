// app/(operations)/dashboard/insights/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { Brain, AlertTriangle, TrendingUp, Lightbulb, Send, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { ForecastChart } from '@/components/operations/charts/ForecastChart';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function InsightsPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Forecast data (7 days actual + 4 days predicted)
  const forecastData = [
    { date: '2026-01-04', actual: 1580, predicted: 1580 },
    { date: '2026-01-05', actual: 1620, predicted: 1620 },
    { date: '2026-01-06', actual: 1550, predicted: 1550 },
    { date: '2026-01-07', actual: 1680, predicted: 1680 },
    { date: '2026-01-08', actual: 1640, predicted: 1640 },
    { date: '2026-01-09', actual: 1590, predicted: 1590 },
    { date: '2026-01-10', actual: 1610, predicted: 1610 },
    { date: '2026-01-11', predicted: 1650, confidenceUpper: 1782, confidenceLower: 1518 },
    { date: '2026-01-12', predicted: 1620, confidenceUpper: 1749.6, confidenceLower: 1490.4 },
    { date: '2026-01-13', predicted: 1580, confidenceUpper: 1706.4, confidenceLower: 1453.6 },
    { date: '2026-01-14', predicted: 1600, confidenceUpper: 1728, confidenceLower: 1472 },
  ];
  
  // AI Analysis Cards
  const analysisCards = [
    {
      type: 'anomaly' as const,
      icon: AlertTriangle,
      title: 'ANOMALY DETECTED',
      item: 'Taxi emissions',
      metric: '+18% above baseline',
      cause: 'Runway 02L maintenance causing longer taxi routes',
      confidence: 92,
    },
    {
      type: 'trend' as const,
      icon: TrendingUp,
      title: 'TREND ANALYSIS',
      item: 'Scope 2 declining',
      metric: '-2.3% weekly avg',
      cause: 'LED retrofit in Jewel showing results',
      confidence: 87,
    },
    {
      type: 'opportunity' as const,
      icon: Lightbulb,
      title: 'OPPORTUNITY IDENTIFIED',
      item: 'Terminal 3 F&B',
      metric: 'has 40% plant-based potential',
      cause: '',
      savings: '8 tCO2e/month',
      confidence: 76,
    },
  ];
  
  // Recommendations
  const recommendations = [
    {
      priority: 'high' as const,
      priorityLabel: '🔴 High',
      action: 'Optimize taxi routing during runway maintenance',
      impact: '-12 tCO2e /week',
      effort: 'Low',
    },
    {
      priority: 'medium' as const,
      priorityLabel: '🟡 Med',
      action: 'Engage top 5 F&B tenants on plant-based menu promotion',
      impact: '-8 tCO2e /week',
      effort: 'Med',
    },
    {
      priority: 'low' as const,
      priorityLabel: '🟢 Low',
      action: 'Review HVAC schedule in T2 transit lounge (overcooling)',
      impact: '-3 tCO2e /week',
      effort: 'Low',
    },
  ];
  
  // Scenario modeling
  const scenarios = [
    {
      title: 'If SAF reaches 2%',
      reduction: '-4,200 tCO2e',
      period: 'Annual reduction:',
    },
    {
      title: 'If 50% of F&B goes plant-based',
      reduction: '-890 tCO2e',
      period: 'Annual reduction:',
    },
  ];
  
  const suggestedQuestions = [
    "Why did emissions spike on Tuesday?",
    "Which airlines improved efficiency this month?",
    "What's driving the Scope 3 increase?",
    "Predict next week's emissions if flight count stays same",
  ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendQuestion = async () => {
    const questionText = question.trim();
    if (!questionText || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: questionText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    try {
      // Prepare messages for API (include conversation history)
      const messagesForAPI = [
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: questionText,
        },
      ];

      // Call Claude API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesForAPI,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content || "Sorry, I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling chat API:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="🤖 AI-POWERED INSIGHTS"
          subtitle={`Today: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
          icon={<Brain className="w-6 h-6" />}
        />
      </div>
      
      {/* ROW 1: FORECAST SUMMARY */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span>📊</span> 7-DAY EMISSIONS FORECAST
        </h3>
        <div className="relative">
          <div className="absolute top-0 right-0 text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
            Forecast Zone
          </div>
          <ForecastChart data={forecastData} height={300} />
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-600">
            <span>◄─── Actual ───►</span>
            <span>◄────── Predicted ──────►</span>
          </div>
        </div>
      </div>
      
      {/* ROW 2: AI ANALYSIS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analysisCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-slate-600" />
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  {card.title}
                </h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">{card.item}</p>
                  <p className="text-xs text-slate-600">{card.metric}</p>
                </div>
                {card.cause && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-600">
                      <span className="font-medium">Cause:</span> {card.cause}
                    </p>
                  </div>
                )}
                {card.savings && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-600">
                      <span className="font-medium">Est. savings:</span> {card.savings}
                    </p>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Confidence:</span> {card.confidence}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* ROW 3: ASK THE AI */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span>💬</span> ASK ABOUT YOUR DATA
        </h3>
        <div className="space-y-4">
          {/* Messages Display */}
          {messages.length > 0 && (
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 max-h-96 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question about emissions, trends, or forecasts..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendQuestion()}
              className="flex-1 !bg-white !border !border-slate-300 !rounded-lg"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendQuestion}
              disabled={!question.trim() || isLoading}
              className="px-6"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(q)}
                  disabled={isLoading}
                  className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  • {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* ROW 4: RECOMMENDATIONS */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <span>🎯</span> AI-GENERATED RECOMMENDATIONS
          </h3>
          <select className="text-sm px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Priority</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Action</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Impact</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Effort</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={index} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">{rec.priorityLabel}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{rec.action}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{rec.impact}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{rec.effort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* ROW 5: SCENARIO MODELING */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span>🔮</span> WHAT-IF SCENARIOS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg p-4 bg-slate-50"
            >
              <h4 className="font-medium text-slate-900 mb-3">{scenario.title}</h4>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">{scenario.period}</p>
                <p className="text-lg font-semibold text-emerald-600">{scenario.reduction}</p>
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                Model This →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
