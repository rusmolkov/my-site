// Initialize Vercel Speed Insights
import { injectSpeedInsights } from './speed-insights.js';

// Initialize Speed Insights when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectSpeedInsights();
  });
} else {
  // DOM is already ready
  injectSpeedInsights();
}
