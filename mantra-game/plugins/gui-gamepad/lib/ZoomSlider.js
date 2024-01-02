export default class ZoomSlider {
    constructor(game) {
        this.game = game;
        this.minZoom = 0.1; // Minimum zoom level
        this.maxZoom = 10; // Maximum zoom level
        this.slider = this.createSlider();
        this.addEventListeners();
    }

    createSlider() {
        let slider = document.createElement('input');
        slider.id = 'zoomSlider';
        slider.type = 'range';
        slider.min = this.logTransform(this.minZoom);
        slider.max = this.logTransform(this.maxZoom);
        slider.step = 'any';
        slider.value = this.logTransform(1); // Default zoom level, in logarithmic scale

        slider.style.width = '300px';
        slider.style.margin = '10px';
        slider.style.display = 'block';

        document.body.appendChild(slider);

        return slider;
    }

    addEventListeners() {
        this.slider.addEventListener('input', (event) => {
            this.handleSliderChange(event);
        });
    }

    handleSliderChange(event) {
        const logValue = parseFloat(event.target.value);
        const zoomValue = this.inverseLogTransform(logValue);
        this.game.setZoom(zoomValue);
    }

    logTransform(value) {
        // Convert linear scale value to logarithmic scale
        return Math.log(value / this.minZoom) / Math.log(this.maxZoom / this.minZoom);
    }

    inverseLogTransform(value) {
        // Convert logarithmic scale value back to linear scale
        return this.minZoom * Math.pow(this.maxZoom / this.minZoom, value);
    }
}
