export default class RenderManager {
    _currentIdx = this._firstIdx;

    get _firstIdx () {
        return 0
    }

    get _lastIdx () {
        return this.items.length - 1;
    }

    get _nextIdx () {
        return this._currentIdx + 1 > this._lastIdx ? this._firstIdx : this._currentIdx + 1
    }

    get _prevIdx () {
        return this._currentIdx - 1 < this._firstIdx ?  this._lastIdx : this._currentIdx - 1
    }

    get _currentItemEl () {
        const currentItemId = this._getItemId(this._currentIdx);
        return document.getElementById(currentItemId);
    }

    get _itemWrapper () {
        return document.querySelector('.item');
    }
 
    constructor (items) {
        this.items = items;
        const firstItemEl = this._createImgItem(this._currentIdx)
        this._itemWrapper.appendChild(firstItemEl)
    }

    _getItemId = (idx) => `item${idx}`;

    _createImgItem = (idx) => {
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', this.items[idx]);
        imgEl.setAttribute('id', this._getItemId(idx));
        return imgEl
    }

    _hasLeftSideImg = () => !!this._currentItemEl.previousSibling

    _hasRightSideImg = () => !!this._currentItemEl.nextSibling

    _renderPrevItem = () => {
        const prevEl = this._createImgItem(this._prevIdx)
        this._itemWrapper.insertBefore(prevEl, this._currentItemEl);
    }

    _renderNextItem = () => {
        const nextEl = this._createImgItem(this._nextIdx)
        this._itemWrapper.appendChild(nextEl);
    }

    render = () => {
        if (!this._hasLeftSideImg()) this._renderPrevItem()
        if (!this._hasRightSideImg()) this._renderNextItem()
    }

    moveNext = () => {
        this._currentItemEl.previousSibling.remove()
        this._currentIdx = this._nextIdx
        this.render()
    }

    movePrev = () => {
        this._currentItemEl.nextSibling.remove()
        this._currentIdx = this._prevIdx
        this.render()
    }
}