/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 7: Customer Feedback Processor
 * Demonstrates string operations (regex split, length) and sentiment keyword detection using includes().
 */

function processFeedback(feedbackText, reviewLabel = "Review") {
  // Calculate total words using trim() and regex whitespace split
  const trimmed = feedbackText.trim();
  const wordsArray = trimmed.length > 0 ? trimmed.split(/\s+/) : [];
  const wordCount = wordsArray.length;

  // Normalize string to lowercase to catch any casing variation of "bad" or "poor"
  const normalizedText = feedbackText.toLowerCase();
  const hasBad = normalizedText.includes("bad");
  const hasPoor = normalizedText.includes("poor");
  const hasNegativeSentiment = hasBad || hasPoor;

  // Classification: If neither "bad" nor "poor" is present -> Positive Feedback
  const sentimentResult = (!hasNegativeSentiment) ? "Positive Feedback" : "Needs Improvement";

  console.log(`--- ${reviewLabel} ---`);
  console.log(`Feedback Text    : "${feedbackText}"`);
  console.log(`Word Count       : ${wordCount} words`);
  console.log(`Contains 'bad'   : ${hasBad}`);
  console.log(`Contains 'poor'  : ${hasPoor}`);
  console.log(`Classification   : [${sentimentResult}]\n`);

  return { wordCount, sentimentResult };
}

console.log("==================================================");
console.log("          CUSTOMER FEEDBACK PROCESSOR             ");
console.log("==================================================\n");

// Test Case 1: Primary assignment string (Positive)
const primaryFeedback = "Great product! Fast delivery and amazing sound quality!";
processFeedback(primaryFeedback, "Test Case 1 (Primary Positive Review)");

// Test Case 2: Negative review with "poor"
const negativeFeedback1 = "The build quality was really poor and customer support took days.";
processFeedback(negativeFeedback1, "Test Case 2 (Negative Review - 'poor')");

// Test Case 3: Negative review with "bad"
const negativeFeedback2 = "Very bad experience with the delivery packaging, item arrived scratched.";
processFeedback(negativeFeedback2, "Test Case 3 (Negative Review - 'bad')");

// Test Case 4: Review containing both words
const mixedFeedback = "Bad performance and poor battery backup, would not recommend.";
processFeedback(mixedFeedback, "Test Case 4 (Negative Review - both keywords)");

console.log("==================================================");

