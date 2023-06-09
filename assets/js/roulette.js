// numPanel

let betDivs = [... document.querySelectorAll('.betDiv')];
let numBoxes = [... document.querySelectorAll('.numPanel .numBox')];
let openGameHamburger = document.querySelector('.svg-icon.icon-zhankai_1');
let closeGameHamburger = document.querySelector('.svg-icon.icon-zhankai_2');
let topBoxToggler = document.querySelector('.right .dot');
let exitGameIcon = document.querySelector('.svg-icon.icon-close');
let detailsBackIcon = document.querySelector('.backIcon');
let gameDetailsIcon = document.querySelector('.svg-icon.icon-explain');
let gameInput = document.querySelector('.betOrder .input');
let selections = [];
let iconDelete = document.querySelector('.svg-icon.icon-delete');
let gameScrollBoxToggler = document.querySelector('.issue-wrap .hash');

let quickComputeBtns = document.querySelectorAll('.input-wrap .active');

const truncateToDecimal = (n, dec = 3) => {
    return (Math.floor(1000 * n) / 1000).toFixed(dec);
}

quickComputeBtns.forEach((quickComputeBtn) => {
    quickComputeBtn.addEventListener('click', (e) => {
        let action = e.currentTarget.textContent;
        if(action == '/3'){
            gameInput.value = truncateToDecimal((gameInput.value / 3));
        } else if (action == 'x3'){
            gameInput.value = truncateToDecimal((gameInput.value * 3));
        }
        calculateValue();
    });
});

// input-wrap


console.log(gameScrollBoxToggler);

gameScrollBoxToggler && gameScrollBoxToggler.addEventListener('click', () => {
    let scrollBox = document.querySelector('.scrollBox');
    if(scrollBox.style.display == 'none'){
        document.querySelector('.mask.mask_history').style.display = "";
        scrollBox.style.display = "block";
    } else {
        document.querySelector('.mask.mask_history').style.display = "none";
        scrollBox.style.display = "none";
    }
    // scrollBox LK28_STYLE
});

gameDetailsIcon && gameDetailsIcon.addEventListener('click', () => location.href = 'game-details.html');

detailsBackIcon && detailsBackIcon.addEventListener('click',  () => history.go(-1));

let calculateValue = () => {
    inputValue = gameInput.value;
    let nums = [... document.querySelectorAll('.betMoneyInfo .num')];
    let result = inputValue * selections.length;

    nums[1].textContent = inputValue ? inputValue : '0.000';
    nums[2].textContent = result ? truncateToDecimal(result) : '0.000';
}

gameInput && gameInput.addEventListener('input', () => calculateValue());



exitGameIcon && exitGameIcon.addEventListener('click', () => history.go(-1));

topBoxToggler && topBoxToggler.addEventListener('click', (e) => {
    let topBox = document.querySelector('.topBox');
    if(topBox.style.display == 'none'){
        document.querySelector('.mask.mask_top').style.display = "";
        topBox.style.display = "";
    } else {
        document.querySelector('.mask.mask_top').style.display = "none";
        topBox.style.display = "none";
    }
})

const removeSelections = () => {
    betDivs.forEach((betDiv) => betDiv.classList.remove('sel'));
}

const clearSelection = () => {
    selections = [];
    removeSelections();
    updateSelectionCount();
}

const updateSelectionCount = () => {
    document.querySelector('.betMoneyInfo .num').textContent = selections.length;
}

openGameHamburger && openGameHamburger.addEventListener('click', (e) => {
    document.querySelector('.sidePage').classList.add('showSidePage');
});
closeGameHamburger && closeGameHamburger.addEventListener('click', (e) => {
    document.querySelector('.sidePage').classList.remove('showSidePage');
});

iconDelete && iconDelete.addEventListener('click', () => {
    [... document.querySelectorAll('.betMoneyInfo .num')].forEach((num, i) => {
        num.textContent = i == 2 ? '0.000' : 0;
    });
    gameInput.value = "";
    clearSelection();
});

// svg-icon icon-delete

betDivs.length && [...betDivs, ...numBoxes].forEach((betDiv) => {
    betDiv.addEventListener('click', (e) => {
        let el = e.currentTarget;
        let targetClass = 'sel';
        classList = el.classList;
        let selection = {
            label : el.querySelector('.label').textContent.trim(),
            num : el.querySelector('.num')?.textContent.trim(),
        };
        if(classList.contains(targetClass)){
            selIdx = selections.findIndex((sel) => sel['label'] == selection['label'] && sel['num'] == selection['num']);
            selections.splice(selIdx, 1);
        } else {
            selections.push(selection);
        }
        el.classList[classList.contains(targetClass) ? 'remove' : 'add'](targetClass);
        updateSelectionCount();
        calculateValue();
    });
});

// svg-icon icon-delete



const fixGameScreen = () => {
    let topBgHeight = parseFloat(getComputedStyle(document.querySelector('.topBg')).height);
    let cHeaderHeight = parseFloat(getComputedStyle(document.querySelector('.cHeader')).height);
    let betOrderHeight = parseFloat(getComputedStyle(document.querySelector('.betOrder')).height);
    let betBtnBoxHeight = parseFloat(getComputedStyle(document.querySelector('.betBtnBox')).height);
    let screenHeight = window.innerHeight;

    let gameScreenHeight = screenHeight - topBgHeight - cHeaderHeight - betOrderHeight - betBtnBoxHeight;

    document.querySelector('.page-content').style.height = gameScreenHeight + 'px';

    document.querySelector('.betMain').style.height = 'max-content';
    // console.log(gameScreenHeight);
}

['load', 'resize'].forEach((ev) => window.addEventListener(ev, fixGameScreen));