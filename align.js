const fs = require('fs');

const pages = {
  'src/app/estimator/page.tsx': { removeClass: 'max-w-4xl mx-auto' },
  'src/app/hra-calculator/page.tsx': { removeClass: 'max-w-4xl mx-auto' },
  'src/app/regime/page.tsx': { removeClass: 'max-w-4xl mx-auto' },
  'src/app/budget-changes/page.tsx': { removeClass: 'max-w-4xl mx-auto' },
  'src/app/itr-selector/page.tsx': { replaceClass: 'max-w-2xl mx-auto' },
  'src/app/checklist/page.tsx': { replaceClass: 'max-w-3xl mx-auto' },
};

for (const [file, actions] of Object.entries(pages)) {
  let content = fs.readFileSync(file, 'utf-8');
  if (actions.removeClass) {
    content = content.replace('className="mb-6 w-full max-w-4xl mx-auto"', 'className="mb-4"');
  }
  if (actions.replaceClass) {
    content = content.replace('className="mb-6 w-full max-w-4xl mx-auto"', `className="mb-4 w-full ${actions.replaceClass}"`);
  }
  fs.writeFileSync(file, content);
}

// Ensure investment-deadlines uses mb-4 for consistency
let idl = fs.readFileSync('src/app/investment-deadlines/page.tsx', 'utf-8');
idl = idl.replace('className="mb-6 w-full max-w-4xl mx-auto"', 'className="mb-4 w-full max-w-4xl mx-auto"');
fs.writeFileSync('src/app/investment-deadlines/page.tsx', idl);

console.log("Aligned the first 7 tools pages.");
