const fs = require('fs');

// Read and parse the historical weather data
const weatherData = JSON.parse(fs.readFileSync('resources/historical_weather.json', 'utf8'));

// Convert temperature data to usable arrays
const times = weatherData.daily.time;
const maxTemps = weatherData.daily.temperature_2m_max.map(t => parseFloat(t));
const minTemps = weatherData.daily.temperature_2m_min.map(t => parseFloat(t));

// Function to check if a day is suitable for cherry blossom bloom
function isBloomDay(dayIndex, temps) {
    const maxTemp = temps[dayIndex];
    const minTemp = temps[dayIndex];
    const avgTemp = (maxTemp + minTemp) / 2;
    
    // Cherry blossom indicators:
    // 1. Max temp should be at least 12°C (warming trend established)
    // 2. Min temp should be at least 5°C (no frost risk)
    // 3. Average temp should be around 10-13°C (optimal bloom range)
    // 4. Day should be in late March to early April
    return (
        maxTemp >= 12 &&
        minTemp >= 5 &&
        avgTemp >= 10 &&
        avgTemp <= 14
    );
}

// Function to find the first bloom day in a given year
function findBloomYear(year, times, maxTemps, minTemps) {
    const bloomDates = [];
    let foundBloom = false;
    
    // Look through March, April, May for each year
    for (let i = 0; i < times.length; i++) {
        const dateStr = times[i];
        const date = new Date(dateStr);
        
        if (date.getFullYear() === year) {
            // Check if it's March, April, or May
            if (date.getMonth() >= 2 && date.getMonth() <= 4) {
                if (isBloomDay(i, maxTemps)) {
                    bloomDates.push({
                        date: dateStr,
                        dayOfYear: date.getDate(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        maxTemp: maxTemps[i],
                        minTemp: minTemps[i],
                        avgTemp: (maxTemps[i] + minTemps[i]) / 2
                    });
                    foundBloom = true;
                }
            }
        }
    }
    
    return foundBloom ? bloomDates[0] : null;
}

// Analyze bloom patterns from historical data
const bloomYears = [2022, 2023, 2024];
const bloomResults = [];

console.log('=== Cherry Blossom Bloom Analysis ===\n');

for (const year of bloomYears) {
    const bloom = findBloomYear(year, times, maxTemps, minTemps);
    
    if (bloom) {
        bloomResults.push({
            year: year,
            bloomDate: bloom.date,
            maxTemp: bloom.maxTemp,
            minTemp: bloom.minTemp,
            avgTemp: bloom.avgTemp
        });
        console.log(`${year}: ${bloom.date} (Max: ${bloom.maxTemp}°C, Min: ${bloom.minTemp}°C, Avg: ${bloom.avgTemp.toFixed(1)}°C)`);
    } else {
        console.log(`${year}: No bloom detected`);
    }
}

// Calculate statistics
const validYears = bloomResults.filter(r => r.bloomDate);

if (validYears.length > 0) {
    // Calculate average day of month for bloom
    const totalDays = validYears.reduce((sum, r) => {
        const date = new Date(r.bloomDate);
        return sum + date.getDate();
    }, 0);
    const avgDayOfMonth = totalDays / validYears.length;
    
    // Calculate average max temperature at bloom
    const avgMaxTemp = validYears.reduce((sum, r) => sum + r.maxTemp, 0) / validYears.length;
    
    // Calculate average min temperature at bloom
    const avgMinTemp = validYears.reduce((sum, r) => sum + r.minTemp, 0) / validYears.length;
    
    // Calculate standard deviation for bloom day
    const variance = validYears.reduce((sum, r) => {
        const date = new Date(r.bloomDate);
        const diff = date.getDate() - avgDayOfMonth;
        return sum + diff * diff;
    }, 0) / validYears.length;
    const stdDev = Math.sqrt(variance);
    
    console.log('\n=== Statistics ===');
    console.log(`Average bloom day: ${avgDayOfMonth.toFixed(1)} of month`);
    console.log(`Average max temp at bloom: ${avgMaxTemp.toFixed(1)}°C`);
    console.log(`Average min temp at bloom: ${avgMinTemp.toFixed(1)}°C`);
    console.log(`Standard deviation (days): ${stdDev.toFixed(1)}`);
    
    // Calculate the range (95% confidence interval)
    const lowerBound = avgDayOfMonth - 1.96 * stdDev;
    const upperBound = avgDayOfMonth + 1.96 * stdDev;
    
    console.log(`95% confidence interval: Day ${Math.ceil(lowerBound)} to ${Math.floor(upperBound)}`);
    
    // Get the most recent bloom year for prediction
    const latestBloom = validYears[validYears.length - 1];
    const latestBloomDate = new Date(latestBloom.bloomDate);
    
    // Calculate days between years
    const daysBetweenYears = [];
    for (let i = 0; i < validYears.length - 1; i++) {
        const date1 = new Date(validYears[i].bloomDate);
        const date2 = new Date(validYears[i + 1].bloomDate);
        daysBetweenYears.push(Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)));
    }
    
    const avgDaysBetween = daysBetweenYears.reduce((sum, d) => sum + d, 0) / daysBetweenYears.length;
    const minDaysBetween = Math.min(...daysBetweenYears);
    const maxDaysBetween = Math.max(...daysBetweenYears);
    
    console.log(`\n=== Year-over-Year Analysis ===`);
    console.log(`Average days between blooms: ${avgDaysBetween.toFixed(1)}`);
    console.log(`Min days between blooms: ${minDaysBetween}`);
    console.log(`Max days between blooms: ${maxDaysBetween}`);
    
    // Get current year's data
    const currentYear = new Date().getFullYear();
    const currentBloom = findBloomYear(currentYear, times, maxTemps, minTemps);
    
    console.log(`\n=== Current Year (${currentYear}) Status ===`);
    if (currentBloom) {
        console.log(`Bloom detected on: ${currentBloom.date}`);
    } else {
        console.log('No bloom detected yet this year');
    }
    
    // Prediction logic
    const nextYear = currentYear + 1;
    const today = new Date();
    const daysInYear = 365;
    
    // Find the bloom date in the next year from historical pattern
    // We'll use the average pattern and account for climate variability
    const predictedAvgDay = avgDayOfMonth;
    const predictedMinDay = Math.ceil(lowerBound);
    const predictedMaxDay = Math.floor(upperBound);
    
    // Adjust prediction based on current year's progress
    // If we're already past the typical bloom time, bloom might be delayed
    let predictedDate;
    let confidence = 'High';
    
    if (today.getMonth() < 2) {
        // January/February - early in the season
        predictedDate = new Date(`${nextYear}-03-${predictedMinDay}`);
    } else if (today.getMonth() === 2) {
        // March - approaching bloom
        const daysIntoMonth = today.getDate();
        const daysUntilBloom = Math.max(0, predictedMinDay - daysIntoMonth);
        predictedDate = new Date(today);
        predictedDate.setDate(predictedDate.getDate() + daysUntilBloom);
        confidence = 'Medium';
    } else if (today.getMonth() === 3) {
        // April - bloom may already have occurred
        const daysIntoMonth = today.getDate();
        if (daysIntoMonth < predictedMinDay) {
            predictedDate = new Date(`${nextYear}-03-${predictedMinDay}`);
        } else if (daysIntoMonth < predictedMaxDay) {
            predictedDate = new Date(`${nextYear}-03-${predictedMinDay}`);
        } else {
            predictedDate = new Date(`${nextYear}-04-${predictedMinDay}`);
        }
        confidence = 'Low';
    } else {
        // May - too late for prediction
        predictedDate = new Date(`${nextYear}-04-${Math.floor(predictedAvgDay)}`);
        confidence = 'Very Low';
    }
    
    // Calculate days from today to predicted bloom
    const diffTime = predictedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Format the prediction
    const formattedDate = predictedDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    console.log(`\n=== PREDICTION ===`);
    console.log(`Predicted cherry blossom bloom in London: ${formattedDate}`);
    console.log(`Days until predicted bloom: ${diffDays}`);
    console.log(`Confidence level: ${confidence}`);
    console.log(`Expected temperature conditions:`);
    console.log(`  - Max temperature: ${avgMaxTemp.toFixed(1)}°C`);
    console.log(`  - Min temperature: ${avgMinTemp.toFixed(1)}°C`);
    console.log(`  - Average temperature: ${(avgMaxTemp + avgMinTemp) / 4}.0°C`);
    
    // Additional insights
    console.log(`\n=== Additional Insights ===`);
    console.log(`- Based on ${validYears.length} years of historical data (${2022}-${2024})`);
    console.log(`- Typical bloom occurs in late March to early April`);
    console.log(`- The prediction accounts for year-to-year temperature variability`);
    console.log(`- Warmer winters tend to result in earlier blooms`);
    console.log(`- Cool spring spells can delay blooming`);
    
} else {
    console.log('Not enough data to make predictions');
}
