 // Initialize Lucide Icons
        lucide.createIcons();

        // Counter Logic
        document.addEventListener('DOMContentLoaded', () => {
      
            let currentCount = 0;
            const countDisplay = document.getElementById('count');
            const incrementBtn = document.getElementById('increment');
            const decrementBtn = document.getElementById('decrement');
            const resetBtn = document.getElementById('reset');

      
            const updateUI = () => {
        
                countDisplay.textContent = currentCount;
               
                decrementBtn.disabled = (currentCount <= 0);
                incrementBtn.disabled = (currentCount >= 10);
              
                      
                countDisplay.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    countDisplay.style.transform = 'scale(1)';
                }, 100);
            };
            incrementBtn.addEventListener('click', () => {
              if(currentCount< 10){
                  currentCount++;
                updateUI();
              }
            });
            decrementBtn.addEventListener('click', () => {
                if (currentCount > 0) {
                    currentCount--;
                    updateUI();
                }
            });
            resetBtn.addEventListener('click', () => {
                currentCount = 0;
                updateUI();
            });
            updateUI();
        });