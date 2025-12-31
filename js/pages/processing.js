// Debug diamond sections
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔵 Processing page loaded - debugging diamond sections');
  console.log('================================================');
  
  // Debug text lines - CRITICAL CHECK
  console.log('\n📝 DEBUGGING TEXT LINES - FIRST LINE MISSING ISSUE:');
  console.log('====================================================');
  
  const titleSection = document.querySelector('.processing-title-section');
  if (titleSection) {
    console.log('✅ Title section found');
    const titleStyles = window.getComputedStyle(titleSection);
    const titleRect = titleSection.getBoundingClientRect();
    
    console.log('\n📍 TITLE SECTION POSITIONING:');
    console.log('  Position:', titleStyles.position);
    console.log('  Top:', titleStyles.top);
    console.log('  Left:', titleStyles.left);
    console.log('  Right:', titleStyles.right);
    console.log('  Bottom:', titleStyles.bottom);
    console.log('  Z-index:', titleStyles.zIndex);
    console.log('  Display:', titleStyles.display);
    console.log('  Visibility:', titleStyles.visibility);
    console.log('  Opacity:', titleStyles.opacity);
    console.log('  Width:', titleStyles.width);
    console.log('  Height:', titleStyles.height);
    console.log('  Bounding rect:', {
      width: titleRect.width,
      height: titleRect.height,
      top: titleRect.top,
      left: titleRect.left,
      right: titleRect.right,
      bottom: titleRect.bottom
    });
    
    // Check parent container
    const aiWrap = titleSection.parentElement;
    if (aiWrap) {
      const wrapStyles = window.getComputedStyle(aiWrap);
      const wrapRect = aiWrap.getBoundingClientRect();
      console.log('\n📦 PARENT CONTAINER (.ai-wrap):');
      console.log('  Position:', wrapStyles.position);
      console.log('  Overflow:', wrapStyles.overflow);
      console.log('  Bounding rect:', wrapRect);
    }
    
    // Check title
    const titleLarge = titleSection.querySelector('.dem-title-large');
    if (titleLarge) {
      const titleText = titleLarge.textContent.trim();
      const titleStyles = window.getComputedStyle(titleLarge);
      const titleRect = titleLarge.getBoundingClientRect();
      console.log(`\n📋 TITLE: "${titleText}"`);
      console.log('  Display:', titleStyles.display);
      console.log('  Visibility:', titleStyles.visibility);
      console.log('  Opacity:', titleStyles.opacity);
      console.log('  Font-size:', titleStyles.fontSize);
      console.log('  Bounding rect:', {
        width: titleRect.width,
        height: titleRect.height,
        top: titleRect.top,
        left: titleRect.left
      });
    } else {
      console.error('❌ Title (.dem-title-large) not found!');
    }
    
    // Check ALL instruction lines
    const instructionLines = titleSection.querySelectorAll('.processing-instruction-line');
    console.log(`\n🔤 INSTRUCTION LINES: Found ${instructionLines.length} total`);
    
    if (instructionLines.length === 0) {
      console.error('❌ NO INSTRUCTION LINES FOUND! Checking HTML structure...');
      console.log('  Title section HTML:', titleSection.innerHTML);
    }
    
    instructionLines.forEach((line, index) => {
      const text = line.textContent.trim();
      const styles = window.getComputedStyle(line);
      const rect = line.getBoundingClientRect();
      const parentRect = line.parentElement.getBoundingClientRect();
      
      console.log(`\n--- Line ${index + 1}: "${text}" ---`);
      console.log('  Text length:', text.length);
      console.log('  HTML content:', line.innerHTML);
      console.log('  Node type:', line.nodeType);
      console.log('  Parent:', line.parentElement.tagName);
      
      console.log('  🎨 STYLES:');
      console.log('    Display:', styles.display, '(should be "block")');
      console.log('    Visibility:', styles.visibility, '(should be "visible")');
      console.log('    Opacity:', styles.opacity, '(should be "1" or close to 1)');
      console.log('    Position:', styles.position);
      console.log('    Font-size:', styles.fontSize);
      console.log('    Font-weight:', styles.fontWeight);
      console.log('    Color:', styles.color);
      console.log('    Line-height:', styles.lineHeight);
      console.log('    Margin-top:', styles.marginTop);
      console.log('    Margin-bottom:', styles.marginBottom);
      console.log('    Padding:', styles.padding);
      
      console.log('  📏 DIMENSIONS:');
      console.log('    Bounding rect width:', rect.width, 'px');
      console.log('    Bounding rect height:', rect.height, 'px');
      console.log('    Bounding rect top:', rect.top, 'px');
      console.log('    Bounding rect left:', rect.left, 'px');
      console.log('    Offset height:', line.offsetHeight, 'px');
      console.log('    Offset width:', line.offsetWidth, 'px');
      console.log('    Scroll height:', line.scrollHeight, 'px');
      console.log('    Client height:', line.clientHeight, 'px');
      console.log('    Client width:', line.clientWidth, 'px');
      
      console.log('  📍 POSITIONING:');
      console.log('    Parent bounding rect:', parentRect);
      console.log('    Relative to parent top:', rect.top - parentRect.top, 'px');
      console.log('    Relative to parent left:', rect.left - parentRect.left, 'px');
      
      // Check for overlapping elements
      const elementsAtPoint = document.elementsFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
      if (elementsAtPoint.length > 0 && elementsAtPoint[0] !== line) {
        console.warn('    ⚠️ Another element is covering this line:', elementsAtPoint[0]);
      }
      
      // Critical checks
      console.log('  ✅/❌ VALIDATION:');
      if (rect.width === 0 || rect.height === 0) {
        console.error(`    ❌ Line ${index + 1} has ZERO dimensions!`);
      } else {
        console.log(`    ✅ Line ${index + 1} has dimensions`);
      }
      
      if (styles.display === 'none') {
        console.error(`    ❌ Line ${index + 1} has display: none!`);
      } else {
        console.log(`    ✅ Line ${index + 1} is displayed`);
      }
      
      if (styles.visibility === 'hidden') {
        console.error(`    ❌ Line ${index + 1} has visibility: hidden!`);
      } else {
        console.log(`    ✅ Line ${index + 1} is visible`);
      }
      
      const opacity = parseFloat(styles.opacity);
      if (opacity === 0 || isNaN(opacity)) {
        console.error(`    ❌ Line ${index + 1} has opacity: ${opacity}!`);
      } else {
        console.log(`    ✅ Line ${index + 1} has opacity: ${opacity}`);
      }
      
      // Check if text is actually there
      if (text.length === 0) {
        console.error(`    ❌ Line ${index + 1} has NO TEXT CONTENT!`);
      } else {
        console.log(`    ✅ Line ${index + 1} has text: "${text}"`);
      }
      
      // Check CSS specificity - are styles being applied?
      const allRules = [];
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          const rules = sheet.cssRules || sheet.rules;
          for (let j = 0; j < rules.length; j++) {
            if (rules[j].selectorText && line.matches(rules[j].selectorText)) {
              allRules.push({
                selector: rules[j].selectorText,
                display: rules[j].style?.display,
                visibility: rules[j].style?.visibility,
                opacity: rules[j].style?.opacity
              });
            }
          }
        } catch (e) {
          // Cross-origin stylesheets
        }
      }
      console.log('  📜 Matching CSS rules:', allRules);
    });
    
    // Check if first line specifically exists
    const firstLine = titleSection.querySelector('.processing-instruction-line:first-of-type');
    if (firstLine) {
      console.log('\n🎯 FIRST LINE SPECIFIC CHECK:');
      console.log('  Text:', firstLine.textContent.trim());
      console.log('  Is visible in DOM:', firstLine.offsetParent !== null);
      console.log('  Is attached to document:', document.contains(firstLine));
      
      // Force check after a delay
      setTimeout(() => {
        const delayedRect = firstLine.getBoundingClientRect();
        const delayedStyles = window.getComputedStyle(firstLine);
        console.log('\n⏰ DELAYED CHECK (after 200ms) - First line:');
        console.log('  Bounding rect:', delayedRect);
        console.log('  Display:', delayedStyles.display);
        console.log('  Visibility:', delayedStyles.visibility);
        console.log('  Opacity:', delayedStyles.opacity);
        if (delayedRect.width === 0 || delayedRect.height === 0) {
          console.error('  ❌ STILL HAS ZERO DIMENSIONS AFTER DELAY!');
        }
      }, 200);
    } else {
      console.error('❌ FIRST LINE NOT FOUND IN DOM!');
    }
    
    // Debug positioning issue
    console.log('\n🔍 POSITIONING DEBUG - WHY NOT MOVING LEFT:');
    const computedStyles = window.getComputedStyle(titleSection);
    const inlineStyles = titleSection.style;
    const rect = titleSection.getBoundingClientRect();
    
    console.log('  Current left position (computed):', computedStyles.left);
    console.log('  Current left position (inline):', inlineStyles.left || 'none');
    console.log('  Current left position (bounding rect):', rect.left, 'px');
    console.log('  CSS left property:', computedStyles.getPropertyValue('left'));
    console.log('  CSS left property (inline):', inlineStyles.getPropertyValue('left') || 'none');
    
    // Check parent positioning
    const parent = titleSection.parentElement;
    if (parent) {
      const parentStyles = window.getComputedStyle(parent);
      const parentRect = parent.getBoundingClientRect();
      console.log('\n  Parent element:', parent.className || parent.tagName);
      console.log('  Parent position:', parentStyles.position);
      console.log('  Parent left:', parentStyles.left);
      console.log('  Parent padding-left:', parentStyles.paddingLeft);
      console.log('  Parent margin-left:', parentStyles.marginLeft);
      console.log('  Parent bounding rect left:', parentRect.left);
      console.log('  Text relative to parent left:', rect.left - parentRect.left, 'px');
    }
    
    // Check for conflicting CSS rules
    console.log('\n  📜 Checking CSS rules:');
    const matchingRules = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        const rules = sheet.cssRules || sheet.rules;
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          if (rule.selectorText && titleSection.matches(rule.selectorText)) {
            const leftValue = rule.style?.left;
            if (leftValue) {
              matchingRules.push({
                selector: rule.selectorText,
                left: leftValue,
                source: sheet.href || 'inline'
              });
            }
          }
        }
      } catch (e) {
        // Cross-origin
      }
    }
    console.log('  Rules with left property:', matchingRules);
    
    // Try to force the position
    console.log('\n  🧪 Testing forced positioning:');
    const originalLeft = computedStyles.left;
    titleSection.style.left = '0px';
    const forcedStyles = window.getComputedStyle(titleSection);
    const forcedRect = titleSection.getBoundingClientRect();
    console.log('  After forcing left=0px:');
    console.log('    Computed left:', forcedStyles.left);
    console.log('    Bounding rect left:', forcedRect.left);
    console.log('    Difference:', forcedRect.left - rect.left, 'px');
    
    // Restore original
    titleSection.style.left = '';
    
    // Debug font sizes
    console.log('\n🔤 FONT SIZE DEBUG:');
    const titleEl = titleSection.querySelector('.dem-title-large');
    if (titleEl) {
      const titleComputed = window.getComputedStyle(titleEl);
      console.log('  A.I. ANALYSIS font-size (computed):', titleComputed.fontSize);
      console.log('  A.I. ANALYSIS font-size (inline):', titleEl.style.fontSize || 'none');
      console.log('  A.I. ANALYSIS font-weight:', titleComputed.fontWeight);
      
      // Check CSS rules
      const titleRules = [];
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          const rules = sheet.cssRules || sheet.rules;
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (rule.selectorText && titleEl.matches(rule.selectorText)) {
              const fontSize = rule.style?.fontSize;
              if (fontSize) {
                titleRules.push({
                  selector: rule.selectorText,
                  fontSize: fontSize,
                  source: sheet.href || 'inline'
                });
              }
            }
          }
        } catch (e) {}
      }
      console.log('  CSS rules affecting title:', titleRules);
    }
    
    instructionLines.forEach((line, index) => {
      const computed = window.getComputedStyle(line);
      const inline = line.style.fontSize;
      console.log(`\n  Instruction line ${index + 1}:`);
      console.log('    Font-size (computed):', computed.fontSize);
      console.log('    Font-size (inline):', inline || 'none');
      console.log('    Expected: 12px');
      console.log('    Match:', computed.fontSize === '12px' ? '✅' : '❌');
    });
    
    // Debug positioning again
    console.log('\n📍 POSITIONING DEBUG - FINAL CHECK:');
    const finalComputed = window.getComputedStyle(titleSection);
    const finalRect = titleSection.getBoundingClientRect();
    console.log('  Final left (computed):', finalComputed.left);
    console.log('  Final left (bounding rect):', finalRect.left, 'px');
    console.log('  Expected left: 0px');
    console.log('  Match:', finalRect.left === 0 ? '✅' : '❌');
    
    // Check if CSS file is loaded
    console.log('\n📄 CSS FILE CHECK:');
    const stylesheets = Array.from(document.styleSheets);
    const processingStyles = stylesheets.find(sheet => {
      try {
        return sheet.href && sheet.href.includes('styles.css');
      } catch (e) {
        return false;
      }
    });
    if (processingStyles) {
      console.log('  ✅ styles.css found:', processingStyles.href);
      try {
        const rules = processingStyles.cssRules || processingStyles.rules;
        const processingRule = Array.from(rules).find(rule => 
          rule.selectorText && rule.selectorText.includes('.processing-title-section')
        );
        if (processingRule) {
          console.log('  ✅ .processing-title-section rule found');
          console.log('    Left:', processingRule.style?.left || 'not set');
          console.log('    Font-size (title):', processingRule.style?.fontSize || 'not set');
        } else {
          console.warn('  ⚠️ .processing-title-section rule not found in stylesheet');
        }
      } catch (e) {
        console.error('  ❌ Cannot access stylesheet rules:', e);
      }
    } else {
      console.error('  ❌ styles.css not found!');
    }
    
  } else {
    console.error('❌ Title section (.processing-title-section) NOT FOUND!');
    console.log('  Checking for alternative selectors...');
    const aiWrap = document.querySelector('.ai-wrap');
    if (aiWrap) {
      console.log('  Found .ai-wrap, children:', Array.from(aiWrap.children).map(c => c.className));
    }
  }
  
  const diamond = document.querySelector('.processing-diamond');
  const sections = document.querySelectorAll('.processing-diamond .diamond-section');
  
  console.log(`🔵 Found ${sections.length} diamond sections`);
  
  if (diamond) {
    const diamondRect = diamond.getBoundingClientRect();
    const diamondStyles = window.getComputedStyle(diamond);
    console.log('\n📦 DIAMOND CONTAINER:');
    console.log('  Width:', diamondStyles.width);
    console.log('  Height:', diamondStyles.height);
    console.log('  Transform:', diamondStyles.transform);
    console.log('  Position:', diamondStyles.position);
    console.log('  Top:', diamondStyles.top);
    console.log('  Left:', diamondStyles.left);
    console.log('  Bounding rect:', {
      width: diamondRect.width,
      height: diamondRect.height,
      top: diamondRect.top,
      left: diamondRect.left
    });
    
    // Check if parent is rotated
    if (diamondStyles.transform && diamondStyles.transform !== 'none') {
      console.log('  ✅ Parent has transform:', diamondStyles.transform);
    } else {
      console.warn('  ⚠️ Parent has NO transform!');
    }
  } else {
    console.error('❌ Diamond container not found!');
  }
  
  console.log('\n🔷 DIAMOND SECTIONS DETAILED INFO:');
  sections.forEach((section, index) => {
    const sectionRect = section.getBoundingClientRect();
    const sectionStyles = window.getComputedStyle(section);
    const sectionClasses = section.className;
    const sectionName = sectionClasses.includes('top') ? 'TOP' : 
                        sectionClasses.includes('left') ? 'LEFT' :
                        sectionClasses.includes('right') ? 'RIGHT' : 'BOTTOM';
    
    console.log(`\n--- Section ${index + 1}: ${sectionName} (${section.textContent.trim()}) ---`);
    console.log('  Classes:', sectionClasses);
    console.log('  Text content:', section.textContent.trim());
    
    // Size and position
    console.log('  📏 Dimensions:');
    console.log('    Width:', sectionStyles.width, '(computed)');
    console.log('    Height:', sectionStyles.height, '(computed)');
    console.log('    Bounding rect width:', sectionRect.width, '(actual rendered)');
    console.log('    Bounding rect height:', sectionRect.height, '(actual rendered)');
    console.log('    Bounding rect top:', sectionRect.top);
    console.log('    Bounding rect left:', sectionRect.left);
    
    // Position properties
    console.log('  📍 Position:');
    console.log('    Top:', sectionStyles.top);
    console.log('    Left:', sectionStyles.left);
    console.log('    Right:', sectionStyles.right);
    console.log('    Bottom:', sectionStyles.bottom);
    console.log('    Transform:', sectionStyles.transform);
    
    // CRITICAL: Clip-path check
    console.log('  ✂️ CLIP-PATH (CRITICAL):');
    const clipPath = sectionStyles.clipPath || sectionStyles.webkitClipPath || '';
    console.log('    clipPath (computed):', clipPath);
    console.log('    clipPath type:', typeof clipPath);
    console.log('    clipPath length:', clipPath.length);
    
    if (!clipPath || clipPath === 'none' || clipPath === '') {
      console.error('    ❌ NO CLIP-PATH APPLIED! This is why you see squares!');
    } else {
      console.log('    ✅ Clip-path IS applied:', clipPath);
      if (!clipPath.includes('polygon')) {
        console.warn('    ⚠️ Clip-path does not contain "polygon"!');
      }
      if (!clipPath.includes('50%')) {
        console.warn('    ⚠️ Clip-path does not contain "50%"!');
      }
    }
    
    // Check computed styles from CSS rules
    console.log('  🎨 Visual Styles:');
    console.log('    Background:', sectionStyles.backgroundColor);
    console.log('    Border:', sectionStyles.border);
    console.log('    Border-width:', sectionStyles.borderWidth);
    console.log('    Border-style:', sectionStyles.borderStyle);
    console.log('    Border-color:', sectionStyles.borderColor);
    console.log('    Overflow:', sectionStyles.overflow);
    console.log('    Box-sizing:', sectionStyles.boxSizing);
    
    // Check if dimensions match (clip-path should make rendered size different)
    if (parseFloat(sectionStyles.width) === sectionRect.width && 
        parseFloat(sectionStyles.height) === sectionRect.height) {
      console.warn('    ⚠️ Computed dimensions match bounding rect - clip-path may not be working!');
    }
    
    // Check CSS rule specificity
    console.log('  🔍 CSS Rule Check:');
    const allStyles = window.getComputedStyle(section);
    const cssRules = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        const rules = sheet.cssRules || sheet.rules;
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].selectorText && section.matches(rules[j].selectorText)) {
            cssRules.push({
              selector: rules[j].selectorText,
              clipPath: rules[j].style?.clipPath || rules[j].style?.webkitClipPath || 'none'
            });
          }
        }
      } catch (e) {
        // Cross-origin stylesheets
      }
    }
    console.log('    Matching CSS rules:', cssRules);
    
    // Visibility check
    if (sectionRect.width === 0 || sectionRect.height === 0) {
      console.error(`    ❌ Section has ZERO dimensions - not visible!`);
    } else {
      console.log('    ✅ Section is visible');
    }
    
    // Shape check - if width and height are equal and clip-path is not working, it's a square
    if (Math.abs(sectionRect.width - sectionRect.height) < 1 && 
        (!clipPath || clipPath === 'none')) {
      console.error('    ❌ RENDERING AS SQUARE - clip-path not applied!');
    }
  });
  
  // Check for conflicting styles
  console.log('\n🔍 CHECKING FOR CONFLICTING STYLES:');
  const globalDiamondSection = document.querySelector('.diamond-section');
  if (globalDiamondSection && globalDiamondSection !== sections[0]) {
    console.log('  Found other .diamond-section elements (may have conflicting styles)');
  }
  
  // Force check after a delay to ensure all styles are applied
  setTimeout(() => {
    console.log('\n⏰ DELAYED CHECK (after 100ms):');
    sections.forEach((section, index) => {
      const styles = window.getComputedStyle(section);
      const clipPath = styles.clipPath || styles.webkitClipPath || '';
      const sectionName = section.className.includes('top') ? 'TOP' : 
                          section.className.includes('left') ? 'LEFT' :
                          section.className.includes('right') ? 'RIGHT' : 'BOTTOM';
      
      if (!clipPath || clipPath === 'none') {
        console.error(`  ❌ Section ${index + 1} (${sectionName}): STILL NO CLIP-PATH!`);
      } else {
        console.log(`  ✅ Section ${index + 1} (${sectionName}): Clip-path = ${clipPath}`);
      }
    });
  }, 100);
});

const proceedBtn = document.getElementById('proceed-btn');
if (proceedBtn) {
  proceedBtn.addEventListener('click', () => {
    console.log('🟢 Proceed button clicked');
    // Navigate to demographics page to show analysis results
    window.location.href = 'demographics.html';
  });
} else {
  console.error('❌ Proceed button not found!');
}

// Demographics diamond click handler
const demographicsDiamond = document.getElementById('demographics-diamond');
if (demographicsDiamond) {
  demographicsDiamond.addEventListener('click', () => {
    console.log('🟢 Demographics diamond clicked');
    window.location.href = 'demographics.html';
  });
} else {
  console.error('❌ Demographics diamond not found!');
}

