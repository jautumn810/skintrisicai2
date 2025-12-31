const proceedBtn = document.getElementById('proceed-btn');
if (proceedBtn) {
  proceedBtn.addEventListener('click', () => {
    window.location.href = 'skin-analysis.html';
  });
}

// Add click handlers to the icon blocks
document.addEventListener('DOMContentLoaded', () => {
  const aiBlocks = document.querySelectorAll('.ai-block');
  
  // First block (camera icon) - show modal
  if (aiBlocks[0]) {
    aiBlocks[0].style.cursor = 'pointer';
    aiBlocks[0].addEventListener('click', () => {
      const modal = document.getElementById('camera-modal');
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  }
  
  // Modal handlers
  const modal = document.getElementById('camera-modal');
  const denyBtn = document.querySelector('.camera-modal-deny');
  const allowBtn = document.querySelector('.camera-modal-allow');
  
  if (denyBtn) {
    denyBtn.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  if (allowBtn) {
    allowBtn.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
      }
      // Request camera access and navigate to selfie page
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
          .then(() => {
            // Camera access granted - navigate to selfie page
            window.location.href = 'selfie.html';
          })
          .catch((error) => {
            console.error('Camera access denied:', error);
            // Still navigate even if permission was denied (browser will show its own prompt)
            window.location.href = 'selfie.html';
          });
      } else {
        // Fallback if getUserMedia is not available
        window.location.href = 'selfie.html';
      }
    });
  }
  
  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  // Second block (gallery icon) - navigate to image upload page
  if (aiBlocks[1]) {
    aiBlocks[1].style.cursor = 'pointer';
    aiBlocks[1].addEventListener('click', () => {
      window.location.href = 'image.html';
    });
  }
});

// Debug rectangle size and position
document.addEventListener('DOMContentLoaded', () => {
  console.log('=== RECTANGLE DEBUG INFO ===');
  
  // Get the second ai-block (right side)
  const aiBlocks = document.querySelectorAll('.ai-block');
  console.log('Total ai-blocks found:', aiBlocks.length);
  
  if (aiBlocks.length >= 2) {
    const rightBlock = aiBlocks[1];
    console.log('Right block element:', rightBlock);
    
    // Get the squares container
    const rightSquares = rightBlock.querySelector('.ai-squares');
    if (rightSquares) {
      console.log('\n--- RIGHT RECTANGLE (ai-squares) ---');
      
      // Get computed styles
      const computed = window.getComputedStyle(rightSquares);
      console.log('Computed width:', computed.width);
      console.log('Computed height:', computed.height);
      console.log('CSS width property:', rightSquares.style.width || 'not set inline');
      console.log('CSS height property:', rightSquares.style.height || 'not set inline');
      console.log('Computed position:', computed.position);
      console.log('Computed top:', computed.top);
      console.log('Computed right:', computed.right);
      console.log('Computed left:', computed.left);
      console.log('Computed transform:', computed.transform);
      console.log('Computed z-index:', computed.zIndex);
      
      // Get bounding rect
      const rect = rightSquares.getBoundingClientRect();
      console.log('\n--- Bounding Rect ---');
      console.log('Top:', rect.top, 'px');
      console.log('Right:', rect.right, 'px');
      console.log('Left:', rect.left, 'px');
      console.log('Width:', rect.width, 'px');
      console.log('Height:', rect.height, 'px');
      
      // Check if CSS rule is being applied
      console.log('\n--- CSS Rule Check ---');
      console.log('Expected width: 30px');
      console.log('Expected height: 30px');
      console.log('Expected position: fixed');
      console.log('Expected top: 52px');
      console.log('Expected right: 28px');
      console.log('Actual computed width:', computed.width);
      console.log('Actual computed height:', computed.height);
      console.log('Actual computed position:', computed.position);
      console.log('Actual computed top:', computed.top);
      console.log('Actual computed right:', computed.right);
      console.log('Actual computed display:', computed.display);
      
      // Check CSS rules in stylesheets
      console.log('\n--- CSS RULES IN STYLESHEETS ---');
      try {
        const sheets = Array.from(document.styleSheets);
        let foundRule = false;
        sheets.forEach((sheet, sheetIndex) => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach((rule) => {
              if (rule.selectorText && rule.selectorText.includes('.ai-block:nth-child(2)')) {
                console.log('Found CSS rule:', rule.selectorText);
                console.log('Rule CSS:', rule.cssText);
                foundRule = true;
              }
            });
          } catch (e) {
            // Cross-origin stylesheet, skip
          }
        });
        if (!foundRule) {
          console.warn('⚠️ CSS rule .ai-block:nth-child(2) .ai-squares NOT FOUND!');
        }
      } catch (e) {
        console.error('Error checking CSS rules:', e);
      }
      
      // Test forcing styles inline
      console.log('\n--- TESTING INLINE STYLES ---');
      const originalStyles = {
        width: rightSquares.style.width,
        height: rightSquares.style.height,
        top: rightSquares.style.top
      };
      rightSquares.style.width = '30px';
      rightSquares.style.height = '30px';
      rightSquares.style.top = '52px';
      rightSquares.style.position = 'fixed';
      rightSquares.style.right = '28px';
      const forcedComputed = window.getComputedStyle(rightSquares);
      console.log('After forcing inline styles:');
      console.log('Width:', forcedComputed.width);
      console.log('Height:', forcedComputed.height);
      console.log('Top:', forcedComputed.top);
      console.log('Position:', forcedComputed.position);
      // Restore
      rightSquares.style.width = originalStyles.width;
      rightSquares.style.height = originalStyles.height;
      rightSquares.style.top = originalStyles.top;
      rightSquares.style.position = '';
      rightSquares.style.right = '';
      
      // Check for conflicting styles
      console.log('\n--- Style Check ---');
      console.log('Has inline styles:', rightSquares.hasAttribute('style'));
      if (rightSquares.hasAttribute('style')) {
        console.log('Inline style:', rightSquares.getAttribute('style'));
      }
    } else {
      console.error('Right squares element not found!');
    }
  } else {
    console.error('Second ai-block not found!');
  }
  
  // Get enter code button position
  const enterCodeBtn = document.querySelector('.enter-code');
  if (enterCodeBtn) {
    console.log('\n--- ENTER CODE BUTTON ---');
    const btnComputed = window.getComputedStyle(enterCodeBtn);
    const btnRect = enterCodeBtn.getBoundingClientRect();
    console.log('Button top:', btnRect.top, 'px');
    console.log('Button bottom:', btnRect.bottom, 'px');
    console.log('Button right:', btnRect.right, 'px');
    console.log('Button height:', btnRect.height, 'px');
    console.log('Button computed margin-top:', btnComputed.marginTop);
    
    // Calculate expected rectangle position
    console.log('\n--- POSITION CALCULATION ---');
    console.log('Button bottom edge:', btnRect.bottom, 'px');
    console.log('Recommended rectangle top (button bottom + 4px):', btnRect.bottom + 4, 'px');
    const rightSquaresForPos = aiBlocks.length >= 2 ? aiBlocks[1].querySelector('.ai-squares') : null;
    console.log('Current rectangle top (from computed):', rightSquaresForPos ? window.getComputedStyle(rightSquaresForPos).top : 'N/A');
  } else {
    console.error('Enter code button not found!');
  }
  
  // Check all CSS rules that might affect this element
  console.log('\n--- CSS SELECTOR MATCHING ---');
  const allBlocks = document.querySelectorAll('.ai-block');
  allBlocks.forEach((block, index) => {
    const squares = block.querySelector('.ai-squares');
    if (squares) {
      console.log(`Block ${index + 1} - squares width:`, window.getComputedStyle(squares).width);
      console.log(`Block ${index + 1} - squares position:`, window.getComputedStyle(squares).position);
      console.log(`Block ${index + 1} - squares top:`, window.getComputedStyle(squares).top);
    }
  });
  
  console.log('\n=== END DEBUG INFO ===');
  
  // Auto-fix if styles aren't applied correctly
  if (aiBlocks.length >= 2) {
    const rightSquares = aiBlocks[1].querySelector('.ai-squares');
    if (rightSquares) {
      const computed = window.getComputedStyle(rightSquares);
      const rect = rightSquares.getBoundingClientRect();
      const expectedWidth = 30;
      const expectedHeight = 30;
      const actualWidth = parseFloat(computed.width);
      const actualHeight = parseFloat(computed.height);
      
      // Check if size is wrong
      if (Math.abs(actualWidth - expectedWidth) > 1 || Math.abs(actualHeight - expectedHeight) > 1) {
        console.warn('⚠️ Size mismatch detected! Applying inline styles to fix...');
        rightSquares.style.width = '30px';
        rightSquares.style.height = '30px';
        rightSquares.style.minWidth = '30px';
        rightSquares.style.maxWidth = '30px';
        rightSquares.style.minHeight = '30px';
        rightSquares.style.maxHeight = '30px';
        console.log('✅ Applied inline width/height styles');
      }
      
      // Check if position is wrong
      const enterCodeBtn = document.querySelector('.enter-code');
      if (enterCodeBtn) {
        const btnRect = enterCodeBtn.getBoundingClientRect();
        const expectedTop = btnRect.bottom + 4;
        const actualTop = rect.top;
        const expectedRight = 8;
        const actualRight = parseFloat(computed.right);
        
        console.log('\n--- POSITION FIX CHECK ---');
        console.log('Expected right:', expectedRight, 'px');
        console.log('Actual computed right:', actualRight, 'px');
        console.log('Difference:', Math.abs(actualRight - expectedRight), 'px');
        
        if (Math.abs(actualTop - expectedTop) > 5 || Math.abs(actualRight - expectedRight) > 1) {
          console.warn('⚠️ Position mismatch detected! Applying inline styles to fix...');
          rightSquares.style.position = 'fixed';
          rightSquares.style.top = expectedTop + 'px';
          rightSquares.style.right = expectedRight + 'px';
          rightSquares.style.left = 'auto';
          rightSquares.style.bottom = 'auto';
          rightSquares.style.transform = 'translate(0, 0)';
          console.log('✅ Applied inline position styles.');
          console.log('  - Top:', expectedTop, 'px');
          console.log('  - Right:', expectedRight, 'px');
          
          // Verify after applying
          setTimeout(() => {
            const newComputed = window.getComputedStyle(rightSquares);
            const newRect = rightSquares.getBoundingClientRect();
            console.log('After fix - Computed right:', newComputed.right);
            console.log('After fix - Bounding rect right:', window.innerWidth - newRect.right, 'px from right edge');
          }, 100);
        } else {
          console.log('✅ Position is correct, no fix needed');
        }
      }
    }
  }
});

