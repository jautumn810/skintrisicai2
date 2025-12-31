// Import CSS for Vite
import '/css/styles.css';

// Handle discover button click with comprehensive debugging
(function setupButtonClickHandlers() {
  console.log('🔧 SETTING UP BUTTON CLICK HANDLERS');
  
  function debugButtonClickability() {
    const discoverButton = document.getElementById('discover-button');
    const takeTestButton = document.getElementById('take-test-button');
    
    console.log('\n=== BUTTON CLICKABILITY DEBUG ===');
    console.log('Timestamp:', new Date().toISOString());
    
    // Check DISCOVER button
    if (discoverButton) {
      const computed = window.getComputedStyle(discoverButton);
      const rect = discoverButton.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0 && 
                       rect.left < window.innerWidth && 
                       rect.right > 0 &&
                       rect.top < window.innerHeight &&
                       rect.bottom > 0;
      
      console.log('\n--- DISCOVER A.I. BUTTON ---');
      console.log('  Element type:', discoverButton.tagName);
      console.log('  Element exists:', 'YES');
      console.log('  Display:', computed.display);
      console.log('  Visibility:', computed.visibility);
      console.log('  Opacity:', computed.opacity);
      console.log('  Pointer events:', computed.pointerEvents);
      console.log('  Position:', computed.position);
      console.log('  Z-index:', computed.zIndex);
      console.log('  Cursor:', computed.cursor);
      console.log('  User select:', computed.userSelect);
      console.log('  Bounding rect:', {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height
      });
      console.log('  Is visible:', isVisible ? '✅ YES' : '❌ NO');
      console.log('  Is in viewport:', (rect.left < window.innerWidth && rect.right > 0 && 
                                       rect.top < window.innerHeight && rect.bottom > 0) ? '✅ YES' : '❌ NO');
      
      // Check if button is clickable
      const isClickable = isVisible && 
                          computed.pointerEvents !== 'none' &&
                          computed.display !== 'none' &&
                          computed.visibility !== 'hidden' &&
                          computed.opacity !== '0';
      console.log('  Is clickable:', isClickable ? '✅ YES' : '❌ NO');
      
      if (!isClickable) {
        console.log('  ⚠️ REASON NOT CLICKABLE:');
        if (computed.pointerEvents === 'none') console.log('    - pointer-events: none');
        if (computed.display === 'none') console.log('    - display: none');
        if (computed.visibility === 'hidden') console.log('    - visibility: hidden');
        if (computed.opacity === '0') console.log('    - opacity: 0');
        if (!isVisible) console.log('    - button not visible');
      }
      
      // Check for overlapping elements
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const elementAtCenter = document.elementFromPoint(centerX, centerY);
      console.log('  Element at button center:', elementAtCenter ? elementAtCenter.tagName + '.' + (elementAtCenter.className || '') : 'NONE');
      console.log('  Is button itself at center:', elementAtCenter === discoverButton || discoverButton.contains(elementAtCenter) ? '✅ YES' : '❌ NO');
      if (elementAtCenter && elementAtCenter !== discoverButton && !discoverButton.contains(elementAtCenter)) {
        console.log('  ⚠️ WARNING: Another element is covering the button!');
        console.log('    Covering element:', elementAtCenter.tagName, elementAtCenter.className || '', elementAtCenter.id || '');
        const coveringComputed = window.getComputedStyle(elementAtCenter);
        console.log('    Covering element z-index:', coveringComputed.zIndex);
        console.log('    Covering element pointer-events:', coveringComputed.pointerEvents);
      }
      
      // Check event listeners
      console.log('  Has click event listener:', discoverButton.onclick !== null || discoverButton.getAttribute('onclick') ? '✅ YES (inline)' : 'Checking...');
    } else {
      console.log('\n--- DISCOVER A.I. BUTTON ---');
      console.log('  ❌ BUTTON NOT FOUND!');
    }
    
    // Check TAKE TEST button
    if (takeTestButton) {
      const computed = window.getComputedStyle(takeTestButton);
      const rect = takeTestButton.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0 && 
                       rect.left < window.innerWidth && 
                       rect.right > 0 &&
                       rect.top < window.innerHeight &&
                       rect.bottom > 0;
      
      console.log('\n--- TAKE TEST BUTTON ---');
      console.log('  Element type:', takeTestButton.tagName);
      console.log('  Element exists:', 'YES');
      console.log('  href attribute:', takeTestButton.href || takeTestButton.getAttribute('href') || 'NONE');
      console.log('  Display:', computed.display);
      console.log('  Visibility:', computed.visibility);
      console.log('  Opacity:', computed.opacity);
      console.log('  Pointer events:', computed.pointerEvents);
      console.log('  Position:', computed.position);
      console.log('  Z-index:', computed.zIndex);
      console.log('  Cursor:', computed.cursor);
      console.log('  User select:', computed.userSelect);
      console.log('  Bounding rect:', {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height
      });
      console.log('  Is visible:', isVisible ? '✅ YES' : '❌ NO');
      console.log('  Is in viewport:', (rect.left < window.innerWidth && rect.right > 0 && 
                                       rect.top < window.innerHeight && rect.bottom > 0) ? '✅ YES' : '❌ NO');
      
      // Check if button is clickable
      const isClickable = isVisible && 
                          computed.pointerEvents !== 'none' &&
                          computed.display !== 'none' &&
                          computed.visibility !== 'hidden' &&
                          computed.opacity !== '0';
      console.log('  Is clickable:', isClickable ? '✅ YES' : '❌ NO');
      
      if (!isClickable) {
        console.log('  ⚠️ REASON NOT CLICKABLE:');
        if (computed.pointerEvents === 'none') console.log('    - pointer-events: none');
        if (computed.display === 'none') console.log('    - display: none');
        if (computed.visibility === 'hidden') console.log('    - visibility: hidden');
        if (computed.opacity === '0') console.log('    - opacity: 0');
        if (!isVisible) console.log('    - button not visible');
      }
      
      // Check for overlapping elements
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const elementAtCenter = document.elementFromPoint(centerX, centerY);
      console.log('  Element at button center:', elementAtCenter ? elementAtCenter.tagName + '.' + (elementAtCenter.className || '') : 'NONE');
      console.log('  Is button itself at center:', elementAtCenter === takeTestButton || takeTestButton.contains(elementAtCenter) ? '✅ YES' : '❌ NO');
      if (elementAtCenter && elementAtCenter !== takeTestButton && !takeTestButton.contains(elementAtCenter)) {
        console.log('  ⚠️ WARNING: Another element is covering the button!');
        console.log('    Covering element:', elementAtCenter.tagName, elementAtCenter.className || '', elementAtCenter.id || '');
        const coveringComputed = window.getComputedStyle(elementAtCenter);
        console.log('    Covering element z-index:', coveringComputed.zIndex);
        console.log('    Covering element pointer-events:', coveringComputed.pointerEvents);
      }
    } else {
      console.log('\n--- TAKE TEST BUTTON ---');
      console.log('  ❌ BUTTON NOT FOUND!');
    }
    
    console.log('\n=== END CLICKABILITY DEBUG ===\n');
  }
  
  // Setup DISCOVER button
  function setupDiscoverButton() {
    const discoverButton = document.getElementById('discover-button');
    
    if (discoverButton) {
      console.log('✅ DISCOVER button found, attaching click handler...');
      
      // Remove any existing listeners by cloning
      const newButton = discoverButton.cloneNode(true);
      discoverButton.parentNode.replaceChild(newButton, discoverButton);
      const button = document.getElementById('discover-button');
      
      // Add click handler with logging
      button.addEventListener('click', function(e) {
        console.log('🖱️ DISCOVER BUTTON CLICKED!');
        console.log('  Event type:', e.type);
        console.log('  Event target:', e.target);
        console.log('  Event currentTarget:', e.currentTarget);
        console.log('  Default prevented:', e.defaultPrevented);
        console.log('  Propagation stopped:', e.cancelBubble);
        console.log('  Timestamp:', new Date().toISOString());
        
        // Check if navigation is blocked
        try {
          console.log('  Attempting navigation to: pages/introduce.html');
          window.location.href = 'pages/introduce.html';
          console.log('  ✅ Navigation initiated');
        } catch (error) {
          console.error('  ❌ Navigation error:', error);
        }
      }, { capture: false, passive: false });
      
      // Also add mousedown and mouseup for debugging
      button.addEventListener('mousedown', function(e) {
        console.log('🖱️ DISCOVER BUTTON MOUSEDOWN');
        console.log('  Button:', e.button);
        console.log('  Buttons:', e.buttons);
      });
      
      button.addEventListener('mouseup', function(e) {
        console.log('🖱️ DISCOVER BUTTON MOUSEUP');
      });
      
      console.log('✅ DISCOVER button click handler attached');
    } else {
      console.log('❌ DISCOVER button not found when setting up handler');
    }
  }
  
  // Setup TAKE TEST button (it's an <a> tag, so it should work with href, but we'll add logging)
  function setupTakeTestButton() {
    const takeTestButton = document.getElementById('take-test-button');
    
    if (takeTestButton) {
      console.log('✅ TAKE TEST button found, attaching click handler...');
      
      // Add click handler with logging (even though it's an <a> tag)
      takeTestButton.addEventListener('click', function(e) {
        console.log('🖱️ TAKE TEST BUTTON CLICKED!');
        console.log('  Event type:', e.type);
        console.log('  Event target:', e.target);
        console.log('  Event currentTarget:', e.currentTarget);
        console.log('  Default prevented:', e.defaultPrevented);
        console.log('  Propagation stopped:', e.cancelBubble);
        console.log('  href:', takeTestButton.href || takeTestButton.getAttribute('href'));
        console.log('  Timestamp:', new Date().toISOString());
        
        // Check if default is prevented
        if (e.defaultPrevented) {
          console.log('  ⚠️ WARNING: Default action was prevented!');
        }
      }, { capture: false, passive: false });
      
      // Also add mousedown and mouseup for debugging
      takeTestButton.addEventListener('mousedown', function(e) {
        console.log('🖱️ TAKE TEST BUTTON MOUSEDOWN');
        console.log('  Button:', e.button);
        console.log('  Buttons:', e.buttons);
      });
      
      takeTestButton.addEventListener('mouseup', function(e) {
        console.log('🖱️ TAKE TEST BUTTON MOUSEUP');
      });
      
      console.log('✅ TAKE TEST button click handler attached');
    } else {
      console.log('❌ TAKE TEST button not found when setting up handler');
    }
  }
  
  // Run setup when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setupDiscoverButton();
      setupTakeTestButton();
      setTimeout(debugButtonClickability, 100);
      setTimeout(debugButtonClickability, 500);
    });
  } else {
    setupDiscoverButton();
    setupTakeTestButton();
    setTimeout(debugButtonClickability, 100);
    setTimeout(debugButtonClickability, 500);
  }
  
  // Also run on window load
  window.addEventListener('load', function() {
    setTimeout(debugButtonClickability, 100);
    setTimeout(debugButtonClickability, 500);
  });
  
  // Run on resize to check if buttons become unclickable
  window.addEventListener('resize', function() {
    setTimeout(debugButtonClickability, 100);
  });
  
  // Make debug function available globally
  window.debugButtonClickability = debugButtonClickability;
  
  console.log('💡 Tip: Run debugButtonClickability() in console to check button clickability');
})();

// Global click listener to debug all clicks
(function setupGlobalClickDebugger() {
  console.log('🔍 SETTING UP GLOBAL CLICK DEBUGGER');
  
  document.addEventListener('click', function(e) {
    const discoverButton = document.getElementById('discover-button');
    const takeTestButton = document.getElementById('take-test-button');
    
    // Check if click is on or near the buttons
    const clickedElement = e.target;
    const isDiscoverButton = discoverButton && (clickedElement === discoverButton || discoverButton.contains(clickedElement));
    const isTakeTestButton = takeTestButton && (clickedElement === takeTestButton || takeTestButton.contains(clickedElement));
    
    if (isDiscoverButton || isTakeTestButton) {
      console.log('\n🖱️ CLICK DETECTED ON BUTTON AREA');
      console.log('  Clicked element:', clickedElement.tagName, clickedElement.className || '', clickedElement.id || '');
      console.log('  Is DISCOVER button:', isDiscoverButton ? '✅ YES' : '❌ NO');
      console.log('  Is TAKE TEST button:', isTakeTestButton ? '✅ YES' : '❌ NO');
      console.log('  Click coordinates:', { x: e.clientX, y: e.clientY });
      console.log('  Event phase:', e.eventPhase === 1 ? 'CAPTURE' : e.eventPhase === 2 ? 'AT_TARGET' : 'BUBBLE');
      console.log('  Default prevented:', e.defaultPrevented);
      console.log('  Propagation stopped:', e.cancelBubble);
      
      // Check what element is actually at the click point
      const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
      console.log('  Element at click point:', elementAtPoint ? elementAtPoint.tagName + '.' + (elementAtPoint.className || '') : 'NONE');
      
      if (isDiscoverButton && !e.defaultPrevented) {
        console.log('  ✅ DISCOVER button click should work');
      } else if (isTakeTestButton && !e.defaultPrevented) {
        console.log('  ✅ TAKE TEST button click should work');
      } else {
        console.log('  ⚠️ WARNING: Click detected but default action may be prevented');
      }
    }
  }, true); // Use capture phase to catch all clicks
  
  console.log('✅ Global click debugger active');
})();

// Debug paragraph positioning
(function debugParagraphPosition() {
  console.log('=== PARAGRAPH POSITIONING DEBUG ===');
  
  function logParagraphInfo() {
    const paragraph = document.querySelector('.home-footer-desktop');
    const paragraphP = paragraph ? paragraph.querySelector('p') : null;
    
    console.log('\n--- Element Check ---');
    console.log('.home-footer-desktop found:', paragraph ? 'YES' : 'NO');
    console.log('.home-footer-desktop p found:', paragraphP ? 'YES' : 'NO');
    
    if (paragraph) {
      const computed = window.getComputedStyle(paragraph);
      const rect = paragraph.getBoundingClientRect();
      
      console.log('\n--- Computed Styles ---');
      console.log('display:', computed.display);
      console.log('position:', computed.position);
      console.log('left:', computed.left);
      console.log('bottom:', computed.bottom);
      console.log('top:', computed.top);
      console.log('right:', computed.right);
      console.log('text-align:', computed.textAlign);
      console.log('width:', computed.width);
      console.log('height:', computed.height);
      console.log('margin:', computed.margin);
      console.log('padding:', computed.padding);
      console.log('z-index:', computed.zIndex);
      console.log('visibility:', computed.visibility);
      console.log('opacity:', computed.opacity);
      
      console.log('\n--- Bounding Rect ---');
      console.log('top:', rect.top, 'px');
      console.log('left:', rect.left, 'px');
      console.log('bottom:', rect.bottom, 'px');
      console.log('right:', rect.right, 'px');
      console.log('width:', rect.width, 'px');
      console.log('height:', rect.height, 'px');
      
      console.log('\n--- Inline Styles ---');
      console.log('style.cssText:', paragraph.style.cssText || 'NONE');
      
      console.log('\n--- Viewport Info ---');
      console.log('viewport width:', window.innerWidth, 'px');
      console.log('viewport height:', window.innerHeight, 'px');
      console.log('is desktop (>=1024px):', window.innerWidth >= 1024);
      
      console.log('\n--- Expected vs Actual ---');
      console.log('Expected position: fixed');
      console.log('Actual position:', computed.position);
      console.log('Expected left: 28px');
      console.log('Actual left:', computed.left, '(rect:', rect.left, 'px)');
      console.log('Expected bottom: 62px');
      console.log('Actual bottom:', computed.bottom, '(rect:', rect.bottom, 'px)');
      console.log('Expected text-align: left');
      console.log('Actual text-align:', computed.textAlign);
      
      // Check if CSS rules are being applied
      console.log('\n--- CSS Rules Check ---');
      try {
        if (document.defaultView && typeof document.defaultView.getMatchedCSSRules === 'function') {
          const rules = document.defaultView.getMatchedCSSRules(paragraph);
          console.log('Matched CSS rules:', rules ? rules.length : 0);
          if (rules) {
            for (let i = 0; i < rules.length; i++) {
              const rule = rules[i];
              if (rule.selectorText && rule.selectorText.includes('home-footer-desktop')) {
                console.log(`Rule ${i} (${rule.selectorText}):`, rule.cssText);
              }
            }
          }
        } else {
          console.log('getMatchedCSSRules not available in this browser');
        }
      } catch (error) {
        console.log('Could not get CSS rules:', error.message);
      }
      
      // Check parent container
      const container = paragraph.parentElement;
      if (container) {
        console.log('\n--- Parent Container ---');
        console.log('Parent class:', container.className);
        const containerComputed = window.getComputedStyle(container);
        console.log('Parent position:', containerComputed.position);
        console.log('Parent display:', containerComputed.display);
        const containerRect = container.getBoundingClientRect();
        console.log('Parent rect:', {
          top: containerRect.top,
          left: containerRect.left,
          width: containerRect.width,
          height: containerRect.height
        });
      }
    } else {
      console.error('❌ Paragraph element not found!');
    }
    
    console.log('\n=== END DEBUG ===\n');
  }
  
  // Run immediately
  logParagraphInfo();
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logParagraphInfo);
  }
  
  // Run on window load
  window.addEventListener('load', () => {
    setTimeout(logParagraphInfo, 100);
    setTimeout(logParagraphInfo, 500);
  });
  
  // Run on resize
  window.addEventListener('resize', logParagraphInfo);
  
  // Make function available globally for manual debugging
  window.debugParagraphPosition = logParagraphInfo;
  
  console.log('💡 Tip: Run debugParagraphPosition() in console to manually check paragraph position');
})();

// Debug button visibility issue
(function debugButtonVisibility() {
  console.log('=== BUTTON VISIBILITY DEBUG ===');
  
  function logButtonInfo() {
    const discoverButton = document.getElementById('discover-button');
    const takeTestButton = document.getElementById('take-test-button');
    const leftSection = document.getElementById('left-section');
    const rightSection = document.getElementById('right-section');
    
    console.log('\n--- Element Existence Check ---');
    console.log('#discover-button found:', discoverButton ? 'YES' : 'NO');
    console.log('#take-test-button found:', takeTestButton ? 'YES' : 'NO');
    console.log('#left-section found:', leftSection ? 'YES' : 'NO');
    console.log('#right-section found:', rightSection ? 'YES' : 'NO');
    
    // Check DISCOVER A.I. button (left)
    if (discoverButton) {
      const computed = window.getComputedStyle(discoverButton);
      const rect = discoverButton.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0 && 
                       computed.opacity !== '0' && 
                       computed.visibility !== 'hidden' &&
                       computed.display !== 'none';
      
      console.log('\n--- DISCOVER A.I. BUTTON (Left) ---');
      console.log('Is visible:', isVisible ? 'YES' : 'NO');
      console.log('Computed styles:');
      console.log('  display:', computed.display);
      console.log('  visibility:', computed.visibility);
      console.log('  opacity:', computed.opacity);
      console.log('  position:', computed.position);
      console.log('  z-index:', computed.zIndex);
      console.log('  pointer-events:', computed.pointerEvents);
      console.log('  transform:', computed.transform);
      console.log('  top:', computed.top);
      console.log('  right:', computed.right);
      console.log('  left:', computed.left);
      console.log('  bottom:', computed.bottom);
      console.log('  width:', computed.width);
      console.log('  height:', computed.height);
      console.log('  margin:', computed.margin);
      console.log('  padding:', computed.padding);
      console.log('  color:', computed.color);
      console.log('  background:', computed.background);
      console.log('  background-color:', computed.backgroundColor);
      
      console.log('\nBounding rect:');
      console.log('  top:', rect.top, 'px');
      console.log('  left:', rect.left, 'px');
      console.log('  bottom:', rect.bottom, 'px');
      console.log('  right:', rect.right, 'px');
      console.log('  width:', rect.width, 'px');
      console.log('  height:', rect.height, 'px');
      
      console.log('\nViewport check:');
      console.log('  viewport width:', window.innerWidth, 'px');
      console.log('  viewport height:', window.innerHeight, 'px');
      console.log('  button in viewport:', rect.left >= 0 && rect.right <= window.innerWidth && 
                  rect.top >= 0 && rect.bottom <= window.innerHeight);
      console.log('  button partially visible:', rect.left < window.innerWidth && rect.right > 0 && 
                  rect.top < window.innerHeight && rect.bottom > 0);
      
      console.log('\nInline styles:');
      console.log('  style.cssText:', discoverButton.style.cssText || 'NONE');
      
      // Check parent section
      if (leftSection) {
        const sectionComputed = window.getComputedStyle(leftSection);
        const sectionRect = leftSection.getBoundingClientRect();
        console.log('\n--- LEFT SECTION (Parent) ---');
        console.log('  display:', sectionComputed.display);
        console.log('  visibility:', sectionComputed.visibility);
        console.log('  opacity:', sectionComputed.opacity);
        console.log('  position:', sectionComputed.position);
        console.log('  left:', sectionComputed.left, '(rect:', sectionRect.left, 'px)');
        console.log('  top:', sectionComputed.top, '(rect:', sectionRect.top, 'px)');
        console.log('  transform:', sectionComputed.transform);
        console.log('  width:', sectionComputed.width, '(rect:', sectionRect.width, 'px)');
        console.log('  height:', sectionComputed.height, '(rect:', sectionRect.height, 'px)');
        console.log('  z-index:', sectionComputed.zIndex);
        console.log('  overflow:', sectionComputed.overflow);
      }
      
      // Check if CSS rules are being applied
      console.log('\n--- Matched CSS Rules ---');
      try {
        if (document.defaultView && typeof document.defaultView.getMatchedCSSRules === 'function') {
          const rules = document.defaultView.getMatchedCSSRules(discoverButton);
          console.log('  Total rules:', rules ? rules.length : 0);
          if (rules) {
            for (let i = 0; i < rules.length; i++) {
              const rule = rules[i];
              if (rule.selectorText) {
                console.log(`  Rule ${i} (${rule.selectorText}):`, rule.cssText.substring(0, 100));
              }
            }
          }
        } else {
          console.log('  getMatchedCSSRules not available in this browser');
        }
      } catch (error) {
        console.log('  Could not get CSS rules:', error.message);
      }
    } else {
      console.error('❌ DISCOVER A.I. button not found!');
    }
    
    // Check TAKE TEST button (right)
    if (takeTestButton) {
      const computed = window.getComputedStyle(takeTestButton);
      const rect = takeTestButton.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0 && 
                       computed.opacity !== '0' && 
                       computed.visibility !== 'hidden' &&
                       computed.display !== 'none';
      
      console.log('\n--- TAKE TEST BUTTON (Right) ---');
      console.log('Is visible:', isVisible ? 'YES' : 'NO');
      console.log('Computed styles:');
      console.log('  display:', computed.display);
      console.log('  visibility:', computed.visibility);
      console.log('  opacity:', computed.opacity);
      console.log('  position:', computed.position);
      console.log('  z-index:', computed.zIndex);
      console.log('  transform:', computed.transform);
      console.log('  top:', computed.top);
      console.log('  left:', computed.left);
      console.log('  right:', computed.right);
      console.log('  width:', computed.width);
      console.log('  height:', computed.height);
      
      console.log('\nBounding rect:');
      console.log('  top:', rect.top, 'px');
      console.log('  left:', rect.left, 'px');
      console.log('  width:', rect.width, 'px');
      console.log('  height:', rect.height, 'px');
      console.log('  button in viewport:', rect.left >= 0 && rect.right <= window.innerWidth && 
                  rect.top >= 0 && rect.bottom <= window.innerHeight);
      
      // Check parent section
      if (rightSection) {
        const sectionComputed = window.getComputedStyle(rightSection);
        const sectionRect = rightSection.getBoundingClientRect();
        console.log('\n--- RIGHT SECTION (Parent) ---');
        console.log('  display:', sectionComputed.display);
        console.log('  position:', sectionComputed.position);
        console.log('  right:', sectionComputed.right, '(rect:', sectionRect.right, 'px)');
        console.log('  transform:', sectionComputed.transform);
        console.log('  width:', sectionComputed.width);
        console.log('  height:', sectionComputed.height);
      }
    } else {
      console.error('❌ TAKE TEST button not found!');
    }
    
    // Check for overlapping elements
    console.log('\n--- Overlapping Elements Check ---');
    const allElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    console.log('Elements at center of viewport:', allElements.length);
    allElements.slice(0, 10).forEach((el, i) => {
      if (el.id || el.className) {
        console.log(`  ${i + 1}. ${el.tagName}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ')[0] : ''}`);
        const elComputed = window.getComputedStyle(el);
        console.log(`     z-index: ${elComputed.zIndex}, position: ${elComputed.position}`);
      }
    });
    
    // Check media query
    console.log('\n--- Media Query Check ---');
    console.log('  window.innerWidth:', window.innerWidth, 'px');
    console.log('  (min-width: 1024px):', window.matchMedia('(min-width: 1024px)').matches);
    console.log('  (min-width: 1280px):', window.matchMedia('(min-width: 1280px)').matches);
    console.log('  (min-width: 1920px):', window.matchMedia('(min-width: 1920px)').matches);
    
    // Check if dev tools are open (this can affect layout)
    console.log('\n--- Dev Tools Detection ---');
    const devToolsOpen = window.outerHeight - window.innerHeight > 160 || 
                        window.outerWidth - window.innerWidth > 160;
    console.log('  Dev tools possibly open:', devToolsOpen ? 'YES' : 'NO');
    console.log('  outerWidth - innerWidth:', window.outerWidth - window.innerWidth, 'px');
    console.log('  outerHeight - innerHeight:', window.outerHeight - window.innerHeight, 'px');
    
    // Summary and diagnosis
    console.log('\n--- DIAGNOSIS SUMMARY ---');
    const isDesktop = window.innerWidth >= 1024;
    const leftSectionDisplay = leftSection ? window.getComputedStyle(leftSection).display : 'unknown';
    const rightSectionDisplay = rightSection ? window.getComputedStyle(rightSection).display : 'unknown';
    
    if (!isDesktop) {
      console.log('⚠️ MOBILE VIEWPORT DETECTED (< 1024px)');
      console.log('  Desktop buttons are HIDDEN by design on mobile');
      console.log('  Left section display:', leftSectionDisplay);
      console.log('  Right section display:', rightSectionDisplay);
      console.log('  This is EXPECTED behavior - buttons only show on desktop (>= 1024px)');
      console.log('  If you see buttons when inspecting, dev tools may be temporarily showing them');
    } else {
      console.log('✅ DESKTOP VIEWPORT DETECTED (>= 1024px)');
      if (leftSectionDisplay === 'none' || rightSectionDisplay === 'none') {
        console.log('❌ PROBLEM: Buttons should be visible on desktop but sections are hidden!');
        console.log('  Left section display:', leftSectionDisplay, '(should be "block")');
        console.log('  Right section display:', rightSectionDisplay, '(should be "block")');
        console.log('  Possible causes:');
        console.log('    - CSS media query not matching');
        console.log('    - CSS not loaded properly');
        console.log('    - Conflicting CSS rules');
      } else {
        console.log('✅ Buttons should be visible');
        console.log('  Left section display:', leftSectionDisplay);
        console.log('  Right section display:', rightSectionDisplay);
        
        // Calculate expected vs actual positioning
        if (leftSection && discoverButton) {
          const sectionComputed = window.getComputedStyle(leftSection);
          const buttonComputed = window.getComputedStyle(discoverButton);
          const sectionRect = leftSection.getBoundingClientRect();
          const buttonRect = discoverButton.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          console.log('\n--- POSITIONING CALCULATION (Left Button) ---');
          console.log('Viewport width:', viewportWidth, 'px');
          console.log('Section CSS left:', sectionComputed.left);
          console.log('Section rect left:', sectionRect.left, 'px');
          console.log('Section width:', sectionRect.width, 'px');
          console.log('Button CSS transform:', buttonComputed.transform);
          console.log('Button rect left:', buttonRect.left, 'px');
          console.log('Button rect right:', buttonRect.right, 'px');
          console.log('Button width:', buttonRect.width, 'px');
          console.log('Expected: Button should be partially visible (left edge should be > 0)');
          console.log('Actual: Button left edge at', buttonRect.left, 'px (negative = off-screen)');
          
          // Calculate what the position should be
          const expectedLeftSectionPos = viewportWidth < 1280 ? 
            `calc(-53vw) = ${-0.53 * viewportWidth}px` : 
            `calc(-50vw) = ${-0.50 * viewportWidth}px`;
          console.log('Expected section position:', expectedLeftSectionPos);
          console.log('Button translateX(20%) should bring it', buttonRect.width * 0.2, 'px into view');
        }
        
        if (rightSection && takeTestButton) {
          const sectionComputed = window.getComputedStyle(rightSection);
          const buttonComputed = window.getComputedStyle(takeTestButton);
          const sectionRect = rightSection.getBoundingClientRect();
          const buttonRect = takeTestButton.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          console.log('\n--- POSITIONING CALCULATION (Right Button) ---');
          console.log('Viewport width:', viewportWidth, 'px');
          console.log('Section CSS right:', sectionComputed.right);
          console.log('Section rect right:', sectionRect.right, 'px');
          console.log('Section width:', sectionRect.width, 'px');
          console.log('Button CSS transform:', buttonComputed.transform);
          console.log('Button rect left:', buttonRect.left, 'px');
          console.log('Button rect right:', buttonRect.right, 'px');
          console.log('Button width:', buttonRect.width, 'px');
          console.log('Expected: Button should be partially visible (right edge should be < viewport width)');
          console.log('Actual: Button right edge at', buttonRect.right, 'px (beyond viewport = off-screen)');
          
          // Calculate what the position should be
          const expectedRightSectionPos = viewportWidth < 1280 ? 
            `calc(-53vw) = ${-0.53 * viewportWidth}px` : 
            `calc(-50vw) = ${-0.50 * viewportWidth}px`;
          console.log('Expected section position:', expectedRightSectionPos);
          console.log('Button translateX(-20%) should bring it', buttonRect.width * 0.2, 'px into view');
        }
      }
    }
    
    console.log('\n=== END BUTTON DEBUG ===\n');
  }
  
  // Run immediately
  logButtonInfo();
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logButtonInfo);
  }
  
  // Run on window load
  window.addEventListener('load', () => {
    setTimeout(logButtonInfo, 100);
    setTimeout(logButtonInfo, 500);
    setTimeout(logButtonInfo, 1000);
  });
  
  // Run on resize (dev tools opening/closing can trigger this)
  window.addEventListener('resize', () => {
    setTimeout(logButtonInfo, 100);
  });
  
  // Monitor for visibility changes
  if (document.getElementById('discover-button')) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || 
             mutation.attributeName === 'class')) {
          console.log('🔍 Button style/class changed, re-checking...');
          setTimeout(logButtonInfo, 50);
        }
      });
    });
    
    const discoverBtn = document.getElementById('discover-button');
    const takeTestBtn = document.getElementById('take-test-button');
    const leftSec = document.getElementById('left-section');
    const rightSec = document.getElementById('right-section');
    
    if (discoverBtn) observer.observe(discoverBtn, { attributes: true, attributeFilter: ['style', 'class'] });
    if (takeTestBtn) observer.observe(takeTestBtn, { attributes: true, attributeFilter: ['style', 'class'] });
    if (leftSec) observer.observe(leftSec, { attributes: true, attributeFilter: ['style', 'class'] });
    if (rightSec) observer.observe(rightSec, { attributes: true, attributeFilter: ['style', 'class'] });
  }
  
  // Make function available globally
  window.debugButtonVisibility = logButtonInfo;
  
  // Track display state changes in real-time
  function trackDisplayChanges() {
    const leftSection = document.getElementById('left-section');
    const rightSection = document.getElementById('right-section');
    const discoverButton = document.getElementById('discover-button');
    const takeTestButton = document.getElementById('take-test-button');
    
    if (leftSection && rightSection) {
      let lastLeftDisplay = window.getComputedStyle(leftSection).display;
      let lastRightDisplay = window.getComputedStyle(rightSection).display;
      let lastViewportWidth = window.innerWidth;
      let lastMediaQueryMatch = window.matchMedia('(min-width: 1024px)').matches;
      
      console.log('\n🔍 Starting display state tracking...');
      console.log('Initial state:');
      console.log('  Left section display:', lastLeftDisplay);
      console.log('  Right section display:', lastRightDisplay);
      console.log('  Viewport width:', lastViewportWidth, 'px');
      console.log('  Media query (>=1024px):', lastMediaQueryMatch);
      
      // Monitor for changes
      const checkInterval = setInterval(() => {
        const currentLeftDisplay = window.getComputedStyle(leftSection).display;
        const currentRightDisplay = window.getComputedStyle(rightSection).display;
        const currentViewportWidth = window.innerWidth;
        const currentMediaQueryMatch = window.matchMedia('(min-width: 1024px)').matches;
        
        if (currentLeftDisplay !== lastLeftDisplay || 
            currentRightDisplay !== lastRightDisplay ||
            currentViewportWidth !== lastViewportWidth ||
            currentMediaQueryMatch !== lastMediaQueryMatch) {
          
          console.log('\n⚠️ DISPLAY STATE CHANGED!');
          console.log('Timestamp:', new Date().toISOString());
          console.log('Left section:', lastLeftDisplay, '→', currentLeftDisplay);
          console.log('Right section:', lastRightDisplay, '→', currentRightDisplay);
          console.log('Viewport width:', lastViewportWidth, '→', currentViewportWidth, 'px');
          console.log('Media query (>=1024px):', lastMediaQueryMatch, '→', currentMediaQueryMatch);
          
          // Check if buttons are affected
          if (discoverButton) {
            const btnDisplay = window.getComputedStyle(discoverButton).display;
            const btnRect = discoverButton.getBoundingClientRect();
            console.log('Discover button display:', btnDisplay, '| visible:', btnRect.width > 0 && btnRect.height > 0);
          }
          if (takeTestButton) {
            const btnDisplay = window.getComputedStyle(takeTestButton).display;
            const btnRect = takeTestButton.getBoundingClientRect();
            console.log('Take test button display:', btnDisplay, '| visible:', btnRect.width > 0 && btnRect.height > 0);
          }
          
          lastLeftDisplay = currentLeftDisplay;
          lastRightDisplay = currentRightDisplay;
          lastViewportWidth = currentViewportWidth;
          lastMediaQueryMatch = currentMediaQueryMatch;
        }
      }, 100);
      
      // Stop tracking after 30 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        console.log('\n✅ Display state tracking stopped');
      }, 30000);
      
      // Also track on resize
      window.addEventListener('resize', () => {
        const newLeftDisplay = window.getComputedStyle(leftSection).display;
        const newRightDisplay = window.getComputedStyle(rightSection).display;
        const newViewportWidth = window.innerWidth;
        const newMediaQueryMatch = window.matchMedia('(min-width: 1024px)').matches;
        
        console.log('\n📐 RESIZE EVENT');
        console.log('Viewport width:', newViewportWidth, 'px');
        console.log('Media query (>=1024px):', newMediaQueryMatch);
        console.log('Left section display:', newLeftDisplay);
        console.log('Right section display:', newRightDisplay);
      });
    }
  }
  
  // Start tracking after a short delay
  setTimeout(trackDisplayChanges, 500);
  
  // Additional real-time visibility check
  function checkButtonVisibility() {
    const discoverButton = document.getElementById('discover-button');
    const takeTestButton = document.getElementById('take-test-button');
    const leftSection = document.getElementById('left-section');
    const rightSection = document.getElementById('right-section');
    
    console.log('\n🔍 REAL-TIME BUTTON VISIBILITY CHECK');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
    
    if (leftSection) {
      const sectionComputed = window.getComputedStyle(leftSection);
      const sectionRect = leftSection.getBoundingClientRect();
      console.log('\n--- LEFT SECTION ---');
      console.log('  display:', sectionComputed.display);
      console.log('  position:', sectionComputed.position);
      console.log('  left:', sectionComputed.left, '(rect:', sectionRect.left, 'px)');
      console.log('  visibility:', sectionComputed.visibility);
      console.log('  opacity:', sectionComputed.opacity);
      console.log('  z-index:', sectionComputed.zIndex);
      console.log('  In viewport:', sectionRect.left < window.innerWidth && sectionRect.right > 0);
    }
    
    if (rightSection) {
      const sectionComputed = window.getComputedStyle(rightSection);
      const sectionRect = rightSection.getBoundingClientRect();
      console.log('\n--- RIGHT SECTION ---');
      console.log('  display:', sectionComputed.display);
      console.log('  position:', sectionComputed.position);
      console.log('  right:', sectionComputed.right, '(rect:', sectionRect.right, 'px)');
      console.log('  visibility:', sectionComputed.visibility);
      console.log('  opacity:', sectionComputed.opacity);
      console.log('  z-index:', sectionComputed.zIndex);
      console.log('  In viewport:', sectionRect.left < window.innerWidth && sectionRect.right > 0);
    }
    
    if (discoverButton) {
      const buttonComputed = window.getComputedStyle(discoverButton);
      const buttonRect = discoverButton.getBoundingClientRect();
      const isVisible = buttonRect.width > 0 && buttonRect.height > 0 && 
                       buttonRect.left < window.innerWidth && 
                       buttonRect.right > 0 &&
                       buttonComputed.opacity !== '0' &&
                       buttonComputed.visibility !== 'hidden' &&
                       buttonComputed.display !== 'none';
      
      console.log('\n--- DISCOVER BUTTON ---');
      console.log('  display:', buttonComputed.display);
      console.log('  visibility:', buttonComputed.visibility);
      console.log('  opacity:', buttonComputed.opacity);
      console.log('  position:', buttonComputed.position);
      console.log('  transform:', buttonComputed.transform);
      console.log('  z-index:', buttonComputed.zIndex);
      console.log('  rect left:', buttonRect.left, 'px');
      console.log('  rect right:', buttonRect.right, 'px');
      console.log('  rect width:', buttonRect.width, 'px');
      console.log('  rect height:', buttonRect.height, 'px');
      console.log('  IS VISIBLE:', isVisible ? '✅ YES' : '❌ NO');
      
      if (!isVisible) {
        console.log('  ⚠️ REASON FOR HIDING:');
        if (buttonRect.width === 0 || buttonRect.height === 0) {
          console.log('    - Button has zero dimensions');
        }
        if (buttonComputed.display === 'none') {
          console.log('    - Button display is "none"');
        }
        if (buttonComputed.visibility === 'hidden') {
          console.log('    - Button visibility is "hidden"');
        }
        if (buttonComputed.opacity === '0') {
          console.log('    - Button opacity is 0');
        }
        if (buttonRect.left >= window.innerWidth) {
          console.log('    - Button is off-screen to the right (left:', buttonRect.left, 'px >= viewport width:', window.innerWidth, 'px)');
        }
        if (buttonRect.right <= 0) {
          console.log('    - Button is off-screen to the left (right:', buttonRect.right, 'px <= 0)');
        }
        if (leftSection && window.getComputedStyle(leftSection).display === 'none') {
          console.log('    - Parent section is hidden (display: none)');
        }
      }
    }
    
    if (takeTestButton) {
      const buttonComputed = window.getComputedStyle(takeTestButton);
      const buttonRect = takeTestButton.getBoundingClientRect();
      const isVisible = buttonRect.width > 0 && buttonRect.height > 0 && 
                       buttonRect.left < window.innerWidth && 
                       buttonRect.right > 0 &&
                       buttonComputed.opacity !== '0' &&
                       buttonComputed.visibility !== 'hidden' &&
                       buttonComputed.display !== 'none';
      
      console.log('\n--- TAKE TEST BUTTON ---');
      console.log('  display:', buttonComputed.display);
      console.log('  visibility:', buttonComputed.visibility);
      console.log('  opacity:', buttonComputed.opacity);
      console.log('  position:', buttonComputed.position);
      console.log('  transform:', buttonComputed.transform);
      console.log('  z-index:', buttonComputed.zIndex);
      console.log('  rect left:', buttonRect.left, 'px');
      console.log('  rect right:', buttonRect.right, 'px');
      console.log('  rect width:', buttonRect.width, 'px');
      console.log('  rect height:', buttonRect.height, 'px');
      console.log('  IS VISIBLE:', isVisible ? '✅ YES' : '❌ NO');
      
      if (!isVisible) {
        console.log('  ⚠️ REASON FOR HIDING:');
        if (buttonRect.width === 0 || buttonRect.height === 0) {
          console.log('    - Button has zero dimensions');
        }
        if (buttonComputed.display === 'none') {
          console.log('    - Button display is "none"');
        }
        if (buttonComputed.visibility === 'hidden') {
          console.log('    - Button visibility is "hidden"');
        }
        if (buttonComputed.opacity === '0') {
          console.log('    - Button opacity is 0');
        }
        if (buttonRect.left >= window.innerWidth) {
          console.log('    - Button is off-screen to the right (left:', buttonRect.left, 'px >= viewport width:', window.innerWidth, 'px)');
        }
        if (buttonRect.right <= 0) {
          console.log('    - Button is off-screen to the left (right:', buttonRect.right, 'px <= 0)');
        }
        if (rightSection && window.getComputedStyle(rightSection).display === 'none') {
          console.log('    - Parent section is hidden (display: none)');
        }
      }
    }
    
    // Check CSS file loading
    const styleTag = document.getElementById('dynamic-styles');
    const linkTag = document.getElementById('main-stylesheet');
    console.log('\n--- CSS LOADING CHECK ---');
    console.log('  Style tag exists:', styleTag ? 'YES' : 'NO');
    console.log('  Style tag content length:', styleTag ? (styleTag.textContent?.length || 0) + ' bytes' : 'N/A');
    console.log('  Link tag exists:', linkTag ? 'YES' : 'NO');
    console.log('  Link tag href:', linkTag ? linkTag.href : 'N/A');
    
    if (styleTag && styleTag.textContent) {
      const hasButtonStyles = styleTag.textContent.includes('.home-desktop-cta-left') || 
                             styleTag.textContent.includes('.home-desktop-cta-right');
      console.log('  CSS contains button styles:', hasButtonStyles ? 'YES' : 'NO');
      
      if (hasButtonStyles) {
        // Extract the transform values
        const leftMatch = styleTag.textContent.match(/\.home-desktop-cta-left[^}]*transform[^}]*translateX\(([^)]+)\)/);
        const rightMatch = styleTag.textContent.match(/\.home-desktop-cta-right[^}]*transform[^}]*translateX\(([^)]+)\)/);
        console.log('  Left button translateX in CSS:', leftMatch ? leftMatch[1] : 'NOT FOUND');
        console.log('  Right button translateX in CSS:', rightMatch ? rightMatch[1] : 'NOT FOUND');
      }
    }
    
    console.log('=== END VISIBILITY CHECK ===\n');
  }
  
  // Run visibility check immediately and repeatedly
  checkButtonVisibility();
  setTimeout(checkButtonVisibility, 100);
  setTimeout(checkButtonVisibility, 500);
  setTimeout(checkButtonVisibility, 1000);
  setTimeout(checkButtonVisibility, 2000);
  
  // Run on window load
  window.addEventListener('load', () => {
    setTimeout(checkButtonVisibility, 100);
    setTimeout(checkButtonVisibility, 500);
  });
  
  // Run on resize
  window.addEventListener('resize', () => {
    setTimeout(checkButtonVisibility, 100);
  });
  
  // Make function available globally
  window.checkButtonVisibility = checkButtonVisibility;
  
  console.log('💡 Tip: Run debugButtonVisibility() in console to manually check button visibility');
  console.log('💡 Tip: Run checkButtonVisibility() in console for real-time visibility check');
  console.log('💡 Display state tracking is active for 30 seconds');
})();