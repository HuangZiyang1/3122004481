class PerformanceProfiler {
    constructor() {
      this.timings = {};
      this.startTimes = {};
    }
  
    start(label) {
      if (!this.timings[label]) {
        this.timings[label] = [];
      }
      this.startTimes[label] = Date.now();
    }
  
    end(label) {
      const endTime = Date.now();
      const startTime = this.startTimes[label];
      if (!startTime) {
        return;
      }
      const timeTaken = endTime - startTime;
      this.timings[label].push(timeTaken);
    }
  
    printSummary() {
      const summary = Object.entries(this.timings).map(([label, times]) => {
        const total = times.reduce((acc, time) => acc + time, 0);
        const average = total / times.length;
        return { label, total, average };
      });
  
      summary.sort((a, b) => b.total - a.total);
  
      console.log('Performance Summary:');
      summary.forEach(({ label, total, average }) => {
        console.log(`Function: ${label}, Total Time: ${total.toFixed(2)}ms, Average Time: ${average.toFixed(2)}ms`);
      });
    }
  }
  
  module.exports = new PerformanceProfiler();