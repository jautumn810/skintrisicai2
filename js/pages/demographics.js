import { loadAI } from '../storage.js';

function sortScores(scores) {
  return Object.entries(scores || {})
    .sort((a, b) => b[1] - a[1])
    .map(([label, val]) => ({ label, pct: (val * 100).toFixed(2), raw: val }));
}

function ArcMeter(value = 0.0) {
  const size = 250;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * value;
  const gap = c - dash;
  const percentage = Math.round(value * 100);

  return `
    <div class="arc-meter-container">
      <svg class="arc-meter-svg" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#cfcfcf" stroke-width="${stroke}"></circle>
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${r}"
          fill="none"
          stroke="#111"
          stroke-width="${stroke}"
          stroke-dasharray="${dash} ${gap}"
          stroke-linecap="butt"
          transform="rotate(-90 ${size / 2} ${size / 2})"
        ></circle>
      </svg>
      <div class="arc-meter-percentage">${percentage}%</div>
    </div>
  `;
}

const ai = loadAI();

if (!ai?.data) {
  document.body.innerHTML = `
    <header class="site-header">
      <a href="/" class="brand">SKINSTRIC</a>
      <div class="header-bracket-container">
        <img src="/Rectangle_2710.png" alt="[" class="header-bracket-img">
        <span class="section">INTRO</span>
        <img src="/Rectangle_2711.png" alt="]" class="header-bracket-img">
      </div>
      <button class="enter-code">ENTER CODE</button>
    </header>
    <div class="page-wrapper">
      <div class="no-data-container">
        <div class="no-data-title">A.I. ANALYSIS</div>
        <div class="no-data-text">
          No demographics data found yet. Upload an image or take a selfie first.
        </div>
        <button
          type="button"
          class="no-data-btn"
          id="no-data-btn"
        >
          GO TO IMAGE STEP
        </button>
      </div>
    </div>
  `;
  // Add event listener for the no-data button
  document.getElementById('no-data-btn').addEventListener('click', () => {
    window.location.href = 'image.html';
  });
} else {
  const race = ai.data.race || {};
  const age = ai.data.age || {};
  const gender = ai.data.gender || {};

  const raceList = sortScores(race);
  const ageList = sortScores(age);
  const genderList = sortScores(gender);

  let actualRace = raceList[0]?.label || '';
  let actualAge = ageList[0]?.label || '';
  let actualGender = genderList[0]?.label || '';

  const raceTop = raceList[0];

  // Update cards
  document.getElementById('race-value').textContent = actualRace || '-';
  document.getElementById('age-value').textContent = actualAge || '-';
  document.getElementById('gender-value').textContent = (actualGender || '-').toUpperCase();

  // Ensure headings are aligned to the left
  setTimeout(() => {
    console.log('🔍 DEBUGGING HEADING LEFT ALIGNMENT - INLINE STYLES');
    console.log('====================================================');
    
    const titleLarge = document.querySelector('.dem-wrap .dem-title-large');
    const demH1 = document.querySelector('.dem-wrap .dem-h1');
    const demSub = document.querySelector('.dem-wrap .dem-sub');
    
    console.log('\n📍 BEFORE APPLYING INLINE STYLES:');
    
    if (titleLarge) {
      const beforeRect = titleLarge.getBoundingClientRect();
      const beforeStyles = window.getComputedStyle(titleLarge);
      console.log('  .dem-title-large:');
      console.log('    Bounding rect left:', beforeRect.left, 'px');
      console.log('    Computed margin-left:', beforeStyles.marginLeft);
      console.log('    Inline style margin-left:', titleLarge.style.marginLeft || 'not set');
      console.log('    CSS margin-left (!important):', beforeStyles.getPropertyValue('margin-left'));
      console.log('    CSS margin-left (priority):', beforeStyles.getPropertyPriority('margin-left'));
    }
    
    if (demH1) {
      const beforeRect = demH1.getBoundingClientRect();
      const beforeStyles = window.getComputedStyle(demH1);
      console.log('  .dem-h1:');
      console.log('    Bounding rect left:', beforeRect.left, 'px');
      console.log('    Computed margin-left:', beforeStyles.marginLeft);
      console.log('    Inline style margin-left:', demH1.style.marginLeft || 'not set');
    }
    
    if (demSub) {
      const beforeRect = demSub.getBoundingClientRect();
      const beforeStyles = window.getComputedStyle(demSub);
      console.log('  .dem-sub:');
      console.log('    Bounding rect left:', beforeRect.left, 'px');
      console.log('    Computed margin-left:', beforeStyles.marginLeft);
      console.log('    Inline style margin-left:', demSub.style.marginLeft || 'not set');
    }
    
    console.log('\n📍 APPLYING INLINE STYLES...');
    
    if (titleLarge) {
      titleLarge.style.setProperty('margin-left', '28px', 'important');
      console.log('  ✅ Applied inline style to .dem-title-large');
    } else {
      console.error('  ❌ .dem-title-large element not found!');
    }
    
    if (demH1) {
      demH1.style.setProperty('margin-left', '28px', 'important');
      console.log('  ✅ Applied inline style to .dem-h1');
    } else {
      console.error('  ❌ .dem-h1 element not found!');
    }
    
    if (demSub) {
      demSub.style.setProperty('margin-left', '28px', 'important');
      console.log('  ✅ Applied inline style to .dem-sub');
    } else {
      console.error('  ❌ .dem-sub element not found!');
    }
    
    console.log('\n📍 AFTER APPLYING INLINE STYLES:');
    
    setTimeout(() => {
      if (titleLarge) {
        const afterRect = titleLarge.getBoundingClientRect();
        const afterStyles = window.getComputedStyle(titleLarge);
        console.log('  .dem-title-large:');
        console.log('    Bounding rect left:', afterRect.left, 'px');
        console.log('    Computed margin-left:', afterStyles.marginLeft);
        console.log('    Inline style margin-left:', titleLarge.style.marginLeft);
        console.log('    Expected margin-left: 28px');
        console.log('    Match:', afterStyles.marginLeft === '28px' ? '✅' : '❌');
      }
      
      if (demH1) {
        const afterRect = demH1.getBoundingClientRect();
        const afterStyles = window.getComputedStyle(demH1);
        console.log('  .dem-h1:');
        console.log('    Bounding rect left:', afterRect.left, 'px');
        console.log('    Computed margin-left:', afterStyles.marginLeft);
        console.log('    Inline style margin-left:', demH1.style.marginLeft);
        console.log('    Expected margin-left: 28px');
        console.log('    Match:', afterStyles.marginLeft === '28px' ? '✅' : '❌');
      }
      
      if (demSub) {
        const afterRect = demSub.getBoundingClientRect();
        const afterStyles = window.getComputedStyle(demSub);
        console.log('  .dem-sub:');
        console.log('    Bounding rect left:', afterRect.left, 'px');
        console.log('    Computed margin-left:', afterStyles.marginLeft);
        console.log('    Inline style margin-left:', demSub.style.marginLeft);
        console.log('    Expected margin-left: 28px');
        console.log('    Match:', afterStyles.marginLeft === '28px' ? '✅' : '❌');
      }
      
      console.log('\n📜 CHECKING FOR CSS RULES THAT MIGHT OVERRIDE:');
      const allStylesheets = Array.from(document.styleSheets);
      const conflictingRules = [];
      allStylesheets.forEach(sheet => {
        try {
          const rules = sheet.cssRules || sheet.rules;
          Array.from(rules).forEach(rule => {
            if (rule.selectorText) {
              const selectors = ['.dem-title-large', '.dem-h1', '.dem-sub'];
              selectors.forEach(sel => {
                if (rule.selectorText.includes(sel) && rule.style?.marginLeft) {
                  conflictingRules.push({
                    selector: rule.selectorText,
                    marginLeft: rule.style.marginLeft,
                    source: sheet.href || 'inline',
                    important: rule.style.getPropertyPriority('margin-left') === 'important'
                  });
                }
              });
            }
          });
        } catch (e) {
          // Cross-origin
        }
      });
      console.log('  CSS rules with margin-left:', conflictingRules);
      
      console.log('\n✅ INLINE STYLES DEBUG COMPLETE');
    }, 50);
  }, 100);

  // Render arc meter with label
  document.getElementById('race-label').textContent = actualRace || '';
  document.getElementById('race-arc-meter').innerHTML = ArcMeter(raceTop ? raceTop.raw : 0.0);

  // DEBUG: Check cards table positioning
  setTimeout(() => {
    console.log('🔍 DEBUGGING CARDS TABLE POSITIONING - FAR LEFT ISSUE');
    console.log('=====================================================');
    
    const demCards = document.querySelector('.dem-cards');
    const demTopSection = document.querySelector('.dem-top-section');
    const demWrap = document.querySelector('.dem-wrap');
    const raceLabel = document.getElementById('race-label');
    
    console.log('\n📍 CARDS TABLE (.dem-cards):');
    if (demCards) {
      const rect = demCards.getBoundingClientRect();
      const styles = window.getComputedStyle(demCards);
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed margin-left:', styles.marginLeft, '(expected: 28px)');
      console.log('  Computed margin-right:', styles.marginRight);
      console.log('  Computed margin-top:', styles.marginTop);
      console.log('  Computed margin-bottom:', styles.marginBottom);
      console.log('  Computed padding-left:', styles.paddingLeft);
      console.log('  Computed padding-right:', styles.paddingRight);
      console.log('  Computed width:', styles.width);
      console.log('  Computed display:', styles.display);
      console.log('  Computed position:', styles.position);
    } else {
      console.error('  ❌ .dem-cards element not found!');
    }
    
    console.log('\n📍 TOP SECTION (.dem-top-section):');
    if (demTopSection) {
      const rect = demTopSection.getBoundingClientRect();
      const styles = window.getComputedStyle(demTopSection);
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed margin-left:', styles.marginLeft, '(expected: 0px)');
      console.log('  Computed margin-right:', styles.marginRight);
      console.log('  Computed display:', styles.display);
      console.log('  Computed grid-template-columns:', styles.gridTemplateColumns);
      console.log('  Computed gap:', styles.gap);
      console.log('  Computed padding:', styles.padding);
    } else {
      console.error('  ❌ .dem-top-section element not found!');
    }
    
    console.log('\n📍 CONTAINER (.dem-wrap):');
    if (demWrap) {
      const rect = demWrap.getBoundingClientRect();
      const styles = window.getComputedStyle(demWrap);
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Computed padding-left:', styles.paddingLeft, '(expected: 0px)');
      console.log('  Computed padding-right:', styles.paddingRight);
      console.log('  Computed margin-left:', styles.marginLeft);
      console.log('  Computed margin-right:', styles.marginRight);
      console.log('  Computed width:', styles.width);
      console.log('  Computed max-width:', styles.maxWidth);
    } else {
      console.error('  ❌ .dem-wrap container not found!');
    }
    
    console.log('\n📍 ARC LABEL (race-label):');
    if (raceLabel) {
      const rect = raceLabel.getBoundingClientRect();
      const styles = window.getComputedStyle(raceLabel);
      console.log('  Text:', raceLabel.textContent.trim());
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed margin:', styles.margin);
      console.log('  Computed padding:', styles.padding);
    }
    
    console.log('\n📍 RELATIVE POSITIONING:');
    if (demCards && demTopSection) {
      const cardsRect = demCards.getBoundingClientRect();
      const sectionRect = demTopSection.getBoundingClientRect();
      console.log('  Cards relative to section left:', cardsRect.left - sectionRect.left, 'px');
      console.log('  Expected: ~28px (if margin-left: 28px is applied)');
    }
    
    if (demCards && raceLabel) {
      const cardsRect = demCards.getBoundingClientRect();
      const labelRect = raceLabel.getBoundingClientRect();
      console.log('  Cards right edge:', cardsRect.right, 'px');
      console.log('  Label left edge:', labelRect.left, 'px');
      console.log('  Overlap?', cardsRect.right > labelRect.left ? 'YES ⚠️' : 'NO ✅');
      if (cardsRect.right > labelRect.left) {
        console.warn('  ⚠️ CARDS TABLE IS OVERLAPPING THE LABEL!');
        console.warn('  Overlap amount:', cardsRect.right - labelRect.left, 'px');
      }
    }
    
    console.log('\n📍 ARC-TABLE WRAPPER:');
    const arcTableWrapper = document.querySelector('.dem-arc-table-wrapper');
    if (arcTableWrapper) {
      const rect = arcTableWrapper.getBoundingClientRect();
      const styles = window.getComputedStyle(arcTableWrapper);
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed margin:', styles.margin);
      console.log('  Computed padding:', styles.padding);
      console.log('  Computed display:', styles.display);
    }
    
    console.log('\n📜 CSS RULES CHECK - Looking for margin/padding rules on .dem-cards:');
    const allStylesheets = Array.from(document.styleSheets);
    const relevantRules = [];
    allStylesheets.forEach(sheet => {
      try {
        const rules = sheet.cssRules || sheet.rules;
        Array.from(rules).forEach(rule => {
          if (rule.selectorText && rule.selectorText.includes('.dem-cards')) {
            const marginLeft = rule.style?.marginLeft;
            const margin = rule.style?.margin;
            const padding = rule.style?.padding;
            const paddingLeft = rule.style?.paddingLeft;
            if (marginLeft || margin || padding || paddingLeft) {
              relevantRules.push({
                selector: rule.selectorText,
                marginLeft: marginLeft || 'not set',
                margin: margin || 'not set',
                padding: padding || 'not set',
                paddingLeft: paddingLeft || 'not set',
                source: sheet.href || 'inline'
              });
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheet
      }
    });
    console.log('  Relevant CSS rules for .dem-cards:', relevantRules);
    
    console.log('\n✅ CARDS TABLE POSITIONING DEBUG COMPLETE');
  }, 100);

  // DEBUG: Check heading alignment
  setTimeout(() => {
    console.log('🔍 DEBUGGING HEADING ALIGNMENT - LEFT POSITIONING');
    console.log('==================================================');
    
    const titleLarge = document.querySelector('.dem-title-large');
    const demH1 = document.querySelector('.dem-h1');
    const demSub = document.querySelector('.dem-sub');
    const demWrap = document.querySelector('.dem-wrap');
    
    console.log('\n📍 A.I. ANALYSIS (.dem-title-large):');
    if (titleLarge) {
      const rect = titleLarge.getBoundingClientRect();
      const styles = window.getComputedStyle(titleLarge);
      const wrapRect = demWrap?.getBoundingClientRect();
      console.log('  Text:', titleLarge.textContent.trim());
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed text-align:', styles.textAlign);
      console.log('  Computed margin-left:', styles.marginLeft);
      console.log('  Computed padding-left:', styles.paddingLeft);
      console.log('  Computed display:', styles.display);
      console.log('  Computed position:', styles.position);
      if (wrapRect) {
        console.log('  Container (.dem-wrap) left:', wrapRect.left, 'px');
        console.log('  Container padding-left:', window.getComputedStyle(demWrap).paddingLeft);
        console.log('  Relative to container left:', rect.left - wrapRect.left, 'px (should be close to 0)');
      }
    } else {
      console.error('  ❌ .dem-title-large element not found!');
    }
    
    console.log('\n📍 DEMOGRAPHICS (.dem-h1):');
    if (demH1) {
      const rect = demH1.getBoundingClientRect();
      const styles = window.getComputedStyle(demH1);
      const wrapRect = demWrap?.getBoundingClientRect();
      console.log('  Text:', demH1.textContent.trim());
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed text-align:', styles.textAlign, '(should be "left")');
      console.log('  Computed margin-left:', styles.marginLeft);
      console.log('  Computed padding-left:', styles.paddingLeft);
      console.log('  Computed display:', styles.display);
      console.log('  Computed position:', styles.position);
      if (wrapRect) {
        console.log('  Container (.dem-wrap) left:', wrapRect.left, 'px');
        console.log('  Container padding-left:', window.getComputedStyle(demWrap).paddingLeft);
        console.log('  Relative to container left:', rect.left - wrapRect.left, 'px (should be close to 0)');
      }
      if (styles.textAlign !== 'left') {
        console.warn('  ⚠️ text-align is NOT "left"! Current value:', styles.textAlign);
      }
    } else {
      console.error('  ❌ .dem-h1 element not found!');
    }
    
    console.log('\n📍 PREDICTED RACE & AGE (.dem-sub):');
    if (demSub) {
      const rect = demSub.getBoundingClientRect();
      const styles = window.getComputedStyle(demSub);
      const wrapRect = demWrap?.getBoundingClientRect();
      console.log('  Text:', demSub.textContent.trim());
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed text-align:', styles.textAlign);
      console.log('  Computed margin-left:', styles.marginLeft);
      console.log('  Computed padding-left:', styles.paddingLeft);
      console.log('  Computed display:', styles.display);
      console.log('  Computed position:', styles.position);
      if (wrapRect) {
        console.log('  Container (.dem-wrap) left:', wrapRect.left, 'px');
        console.log('  Container padding-left:', window.getComputedStyle(demWrap).paddingLeft);
        console.log('  Relative to container left:', rect.left - wrapRect.left, 'px (should be close to 0)');
      }
    } else {
      console.error('  ❌ .dem-sub element not found!');
    }
    
    console.log('\n📍 CONTAINER (.dem-wrap):');
    if (demWrap) {
      const rect = demWrap.getBoundingClientRect();
      const styles = window.getComputedStyle(demWrap);
      console.log('  Bounding rect left:', rect.left, 'px');
      console.log('  Computed padding-left:', styles.paddingLeft, '(expected: 28px)');
      console.log('  Computed padding-right:', styles.paddingRight);
      console.log('  Computed margin-left:', styles.marginLeft);
      console.log('  Computed margin-right:', styles.marginRight);
      console.log('  Computed max-width:', styles.maxWidth);
      console.log('  Computed width:', styles.width);
      console.log('  Computed text-align:', styles.textAlign);
    } else {
      console.error('  ❌ .dem-wrap container not found!');
    }
    
    console.log('\n📜 CSS RULES CHECK - Looking for text-align rules:');
    const allStylesheets = Array.from(document.styleSheets);
    const relevantRules = [];
    allStylesheets.forEach(sheet => {
      try {
        const rules = sheet.cssRules || sheet.rules;
        Array.from(rules).forEach(rule => {
          if (rule.selectorText) {
            const selectors = ['.dem-title-large', '.dem-h1', '.dem-sub', '.dem-wrap'];
            selectors.forEach(sel => {
              if (rule.selectorText.includes(sel)) {
                const textAlign = rule.style?.textAlign;
                const marginLeft = rule.style?.marginLeft;
                const paddingLeft = rule.style?.paddingLeft;
                if (textAlign || marginLeft || paddingLeft) {
                  relevantRules.push({
                    selector: rule.selectorText,
                    textAlign: textAlign || 'not set',
                    marginLeft: marginLeft || 'not set',
                    paddingLeft: paddingLeft || 'not set',
                    source: sheet.href || 'inline'
                  });
                }
              }
            });
          }
        });
      } catch (e) {
        // Cross-origin stylesheet
      }
    });
    console.log('  Relevant CSS rules:', relevantRules);
    
    console.log('\n✅ ALIGNMENT DEBUG COMPLETE');
  }, 100);

  // DEBUG: Log table dimensions and styles
  setTimeout(() => {
    console.log('🔍 DEBUGGING TABLE WIDTH ISSUE');
    console.log('================================');
    
    const raceTable = document.getElementById('race-table');
    const raceTableContainer = raceTable?.closest('.dem-table');
    const raceTableSide = raceTable?.closest('.dem-table-side');
    const demSection = raceTable?.closest('.dem-section');
    
    console.log('\n📍 TABLE ELEMENT:');
    if (raceTable) {
      const rect = raceTable.getBoundingClientRect();
      const styles = window.getComputedStyle(raceTable);
      console.log('  Element:', raceTable);
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Bounding rect height:', rect.height, 'px');
      console.log('  Computed width:', styles.width);
      console.log('  Computed max-width:', styles.maxWidth);
      console.log('  Computed min-width:', styles.minWidth);
      console.log('  Computed display:', styles.display);
      console.log('  Computed box-sizing:', styles.boxSizing);
      console.log('  Computed padding:', styles.padding);
      console.log('  Computed margin:', styles.margin);
    } else {
      console.error('  ❌ race-table element not found!');
    }
    
    console.log('\n📍 TABLE CONTAINER (.dem-table):');
    if (raceTableContainer) {
      const rect = raceTableContainer.getBoundingClientRect();
      const styles = window.getComputedStyle(raceTableContainer);
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed width:', styles.width);
      console.log('  Computed max-width:', styles.maxWidth);
      console.log('  Computed min-width:', styles.minWidth);
      console.log('  Computed display:', styles.display);
      console.log('  Computed padding:', styles.padding);
      console.log('  Computed margin:', styles.margin);
      console.log('  Computed background:', styles.backgroundColor);
    } else {
      console.error('  ❌ .dem-table container not found!');
    }
    
    console.log('\n📍 TABLE SIDE CONTAINER (.dem-table-side):');
    if (raceTableSide) {
      const rect = raceTableSide.getBoundingClientRect();
      const styles = window.getComputedStyle(raceTableSide);
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed width:', styles.width);
      console.log('  Computed max-width:', styles.maxWidth, '(expected: 400px)');
      console.log('  Computed min-width:', styles.minWidth);
      console.log('  Computed display:', styles.display);
      console.log('  Computed padding:', styles.padding);
      console.log('  Computed margin:', styles.margin);
      console.log('  Computed flex:', styles.flex);
      console.log('  Computed flex-basis:', styles.flexBasis);
      if (rect.width > 400) {
        console.warn('  ⚠️ WIDTH EXCEEDS MAX-WIDTH! Actual:', rect.width, 'px, Max:', styles.maxWidth);
      }
    } else {
      console.error('  ❌ .dem-table-side container not found!');
    }
    
    console.log('\n📍 SECTION CONTAINER (.dem-section):');
    if (demSection) {
      const rect = demSection.getBoundingClientRect();
      const styles = window.getComputedStyle(demSection);
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed width:', styles.width);
      console.log('  Computed display:', styles.display);
      console.log('  Computed grid-template-columns:', styles.gridTemplateColumns);
      console.log('  Computed gap:', styles.gap);
      console.log('  Computed padding:', styles.padding);
      console.log('  Computed margin:', styles.margin);
    } else {
      console.error('  ❌ .dem-section container not found!');
    }
    
    console.log('\n📍 ARC SIDE CONTAINER (.dem-arc-side):');
    const arcSide = document.querySelector('.dem-arc-side');
    if (arcSide) {
      const rect = arcSide.getBoundingClientRect();
      const styles = window.getComputedStyle(arcSide);
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed width:', styles.width);
      console.log('  Computed display:', styles.display);
      console.log('  Computed flex:', styles.flex);
      console.log('  Computed gap:', styles.gap);
    }
    
    console.log('\n📍 ALL TABLE ROWS:');
    const rows = document.querySelectorAll('.dem-row');
    console.log('  Number of rows:', rows.length);
    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const styles = window.getComputedStyle(row);
      console.log(`  Row ${index + 1}:`, {
        width: rect.width + 'px',
        computedWidth: styles.width,
        gridTemplateColumns: styles.gridTemplateColumns,
        padding: styles.padding
      });
    });
    
    console.log('\n📍 TABLE HEAD:');
    const tableHead = document.querySelector('.dem-table-head');
    if (tableHead) {
      const rect = tableHead.getBoundingClientRect();
      const styles = window.getComputedStyle(tableHead);
      console.log('  Bounding rect width:', rect.width, 'px');
      console.log('  Computed width:', styles.width);
      console.log('  Computed grid-template-columns:', styles.gridTemplateColumns);
      console.log('  Computed padding:', styles.padding);
    }
    
    console.log('\n📜 CSS RULES CHECK:');
    // Check for CSS rules that might be affecting width
    const allStylesheets = Array.from(document.styleSheets);
    const relevantRules = [];
    allStylesheets.forEach(sheet => {
      try {
        const rules = sheet.cssRules || sheet.rules;
        Array.from(rules).forEach(rule => {
          if (rule.selectorText) {
            const selectors = [
              '.dem-table',
              '.dem-table-side',
              '.dem-section',
              '.dem-row',
              '.dem-table-head'
            ];
            selectors.forEach(sel => {
              if (rule.selectorText.includes(sel)) {
                const width = rule.style?.width;
                const maxWidth = rule.style?.maxWidth;
                const minWidth = rule.style?.minWidth;
                if (width || maxWidth || minWidth) {
                  relevantRules.push({
                    selector: rule.selectorText,
                    width: width || 'not set',
                    maxWidth: maxWidth || 'not set',
                    minWidth: minWidth || 'not set',
                    source: sheet.href || 'inline'
                  });
                }
              }
            });
          }
        });
      } catch (e) {
        // Cross-origin stylesheet
      }
    });
    console.log('  Relevant CSS rules:', relevantRules);
    
    console.log('\n✅ DEBUG COMPLETE');
  }, 100);

  function renderTable(list, selected, type, onSelect) {
    return list.map(opt => `
      <button
        type="button"
        class="dem-row ${selected === opt.label ? 'selected' : ''}"
        data-value="${opt.label}"
        data-type="${type}"
      >
        <div class="dem-left">
          <div class="dem-radio"></div>
          <div>${opt.label}</div>
        </div>
        <div class="dem-right">${opt.pct}%</div>
      </button>
    `).join('');
  }

  document.getElementById('race-table').innerHTML = renderTable(raceList, actualRace, 'race', (val) => {
    actualRace = val;
    document.getElementById('race-value').textContent = actualRace;
    document.getElementById('race-label').textContent = actualRace;
    const selectedRace = raceList.find(r => r.label === val);
    document.getElementById('race-arc-meter').innerHTML = ArcMeter(selectedRace ? selectedRace.raw : 0.0);
    updateRaceCard();
    updateRows();
  });

  function updateRaceCard() {
    const card = document.getElementById('race-card');
    card.classList.add('black');
    document.getElementById('age-card').classList.remove('black');
    document.getElementById('gender-card').classList.remove('black');
  }


  function updateRows() {
    document.querySelectorAll('.dem-row[data-type="race"]').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === actualRace);
    });
  }

  // Add event listeners
  document.addEventListener('click', (e) => {
    const row = e.target.closest('.dem-row');
    if (row) {
      const value = row.dataset.value;
      const type = row.dataset.type;
      
      if (type === 'race') {
        actualRace = value;
        document.getElementById('race-value').textContent = actualRace;
        document.getElementById('race-label').textContent = actualRace;
        const selectedRace = raceList.find(r => r.label === value);
        document.getElementById('race-arc-meter').innerHTML = ArcMeter(selectedRace ? selectedRace.raw : 0.0);
        updateRaceCard();
      }
      
      updateRows();
    }
  });
}

