import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Star, Heart, Sparkles } from 'lucide-react';

export const Screen9Feedback: React.FC = () => {
  const { goBack, navigateTo, feedback, setFeedback } = useApp();
  const [rating, setRating] = useState<number>(feedback.rating || 5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>(feedback.comment || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({
      rating,
      comment,
    });
    navigateTo('10-thankyou');
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goBack}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-900">Feedback</h2>
          <div className="w-5"></div>
        </div>

        {/* Heart in hands graphic matching wireframe */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-24 h-24 rounded-full bg-blue-50/80 flex items-center justify-center border border-blue-100 shadow-inner">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Heart className="w-10 h-10 fill-blue-500 text-blue-500 animate-pulse" />
            </div>
            <Sparkles className="w-5 h-5 text-amber-400 absolute top-1 right-2" />
            <Sparkles className="w-4 h-4 text-blue-400 absolute bottom-2 left-2" />
          </div>

          <h2 className="text-lg font-bold text-slate-900 mt-4 text-center">
            How was your experience?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 text-center">
            Your honest review helps keep our community safe and caring.
          </p>

          {/* 5-Star Interactive Rating */}
          <div className="flex items-center space-x-2 my-5">
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = (hoverRating !== null ? hoverRating : rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 text-slate-300 hover:scale-125 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      filled
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 hover:text-amber-200'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Share feedback input */}
        <div className="text-left">
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Share your feedback
          </label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
          ></textarea>
        </div>
      </div>

      {/* Submit CTA */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};
