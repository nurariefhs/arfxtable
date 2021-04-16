/**
 * Arfxtable is a vanilla js version of JQuery Datatable that support rowspan on tbody
 * @author {Nur Arief HS}
 */
class Arfxtable {
    constructor(sourceProps = {}) {

        /**
         * Target tabel to build arfxtable
         * @type {string}
         */
        this.target = null;

        /**
         * URL that serve data JSON
         * @type {string}
         */
        this.url = null;

        /** 
         * Hold response data 
         * @type {object}
         * */
        this.res = null;

        /** 
         * Current page of the table 
         * @type {number | string}
         * */
        this.currentPage = 1;

        /** 
         * Hold setTimeout in delay method 
         * @type {?Function}
         * */
        this.searchTimer = null;

        /** 
         * Count total custom element added to the table 
         * @type {number}
         * */
        this.totalElement = 0;

        /**
         * Show or hide the search box.
         * @type {boolean}
         */
        this.search = true;

        /**
         * Show or hide pagination
         * @type {boolean}
         */
        this.pagination = true;

        /**
         * Enable or disable highlighted search
         * @type {boolean}
         */
        this.highlight = true;

        /**
         * Available options for highlight feature
         * @type {Object}
         * @property {string} color - The color of highlighted search text.
         * @property {string} background - The background color of highlighted search.
         */
        this.highlightOptions = {
            color: 'black',
            background: 'orange'
        }

        /**
         * Time delay for search after keyup idle in milisecond.
         * @type {number}
         */
        this.searchDelay = 1000;

        /**
         * Count how many times table redraw
         * @type {number}
         */
        this.draw = 0;

        /**
         * Start number of data 
         * @type {number}
         */
        this.start = 0;

        /**
         * Number data to show in one page of table 
         * @type {number}
         */
        this.pageLength = 10;

        /**
         * Word to search
         * @type {string}
         */
        this.searchValue = '';

        /**
         * Send data to the server
         * @type {Function}
         * @returns {object}
         */
        this.data = function () {
            return {}
        }

        /**
         * @typedef columns
         * @type {Object}
         * @property {number} target - Index number of column target left to right.
         * @property {string} className - Class name, multiple class divide by space.
         */

        /**
         * Column customization
         * @type {Array.<Object>}
         */
        this.columns = [];

        /**
         * Default asset loader
         * @type {Function}
         * @returns {string}
         */
        this.loaderAsset = this.loaderDefault();

        /**
         * If not false get data attribute from given order number <td> then pass to parent <tr>
         * @type {number | boolean}
         */
        this.trData = false;

        let props = Object.assign(this, sourceProps);
        Object.keys(props).map(v => {
            this[v] = props[v];
        })

        this.buildLoader();
        this.buildTopContainer();
        this.build();
    }

    /**
     * Generate data before sending to server.
     * @type {Function}
     * @returns {URLSearchParams}
     */
    generateData() {
        let data = this.data();
        let usp = new URLSearchParams(data);

        usp.append('start', this.start);
        usp.append('length', this.pageLength);
        usp.append('search[value]', this.searchValue);

        return usp;
    }

    /**
     * Build table function.
     * @async
     * @type {Function}
     * @returns {void}
     */
    async build() {
        /**
         * @type {?Object}
         */
        let _res = null
        await fetch(this.url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify(this.generateData())
            body: this.generateData()
        })
            .then(res => res.json())
            .then(res => {
                _res = res;
            })
            .catch(error => {
                console.error('Error:', error);
            })

        let _data = _res.data;
        this.res = _res;

        //Build table 
        // let thead = document.querySelector(`${this.target} thead`);
        let tbody = document.querySelector(`${this.target} tbody`);
        tbody.innerHTML = '';

        //Column customization
        let columns = {};
        this.columns.map(v => {
            columns[v.target] = v;
        })

        _data.map(v => {
            let highest = 1;
            v.map(vv => {
                let isArray = Array.isArray(vv);
                highest = isArray && vv.length > highest ? vv.length : highest;
            })

            for (let i = 0; i < highest; i++) {
                let tr = document.createElement('tr');
                let dataset = null;
                if (this.trData !== false) {
                    let div = document.createElement('div');
                    div.innerHTML = v[this.trData];
                    dataset = div.children[0].dataset;
                    Object.keys(dataset).map(vv => {
                        tr.setAttribute(`data-${vv}`, dataset[vv]);
                    })
                }

                v.map((vv, ii, aa) => {

                    let isArray = Array.isArray(vv);
                    if (isArray) {
                        let td = document.createElement('td');

                        //Add column customization
                        if (ii in columns) {
                            if ('className' in columns[ii]) {
                                let classList = columns[ii].className.split(' ');
                                td.classList.add(...classList);
                            }
                        }

                        td.innerHTML = vv[i] ?? '';
                        tr.appendChild(td);
                    } else {
                        if (i == 0) {
                            let td = document.createElement('td');

                            //Add column customization
                            if (ii in columns) {
                                if ('className' in columns[ii]) {
                                    let classList = columns[ii].className.split(' ');
                                    td.classList.add(...classList);
                                }
                            }

                            td.setAttribute('rowspan', highest);
                            td.innerHTML = vv ?? '';
                            tr.appendChild(td);
                        }
                    }
                })
                tbody.appendChild(tr);
            }

        })

        this.pagination && this.buildPagination();
        this.highlight && this.buildHighlight();
        this.loader(false);
    }

    /**
     * Rebuild the table. 
     * @type {Function}
     * @returns {void}
     */
    reload() {
        this.loader(true);
        this.build();
    }


    /**
     * Show loader or hide.
     * @type {Function}
     * @param {boolean} active Set to true to show the loader.
     */
    loader(active = false) {
        let loader = document.querySelector('#arfxtableLoader');
        loader.style.display = active ? 'block' : 'none';
    }

    /**
     * Build loader element
     * @type {Function}
     * @returns {void}
     */
    buildLoader() {
        let body = document.querySelector('body');
        let bg = document.createElement('div');
        bg.setAttribute('id', 'arfxtableLoader');
        bg.setAttribute('style', `
            position: fixed;
            top: 0;
            display: block;
            width: 100vw;
            height: 100vh;
            opacity: 0.5;
            z-index: 10000; 
        `);
        body.appendChild(bg);

        let loaderDiv = this.loaderDiv();
        bg.appendChild(loaderDiv);
    }

    /**
     * Create loader wrapper element
     * @type {Function}
     * @returns {void}
     */
    loaderDiv() {
        let div = document.createElement('div');
        div.setAttribute('style', `
            margin-top: 40vh;
        `);

        div.innerHTML = this.loaderAsset;
        return div;
    }

    /**
     * Generate default loader element.
     * @type {Function}
     * @returns {string}
     */
    loaderDefault() {
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="104px" height="104px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#777777" stroke-width="7" r="25" stroke-dasharray="117.80972450961724 41.269908169872416">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
        </svg>`;
    }

    /**
     * Build pagination element.
     * @type {Function}
     * @returns {void}
     */
    buildPagination() {

        let arfxtable_pagination = document.querySelector('#arfxtable_pagination');

        if (arfxtable_pagination != null) {
            arfxtable_pagination.remove();
        }

        let totalPage = Math.ceil(this.res.recordsFiltered / this.pageLength);

        let styleLi = `
            display: inline-block;
            padding: 5px 10px;
            border: 1px #dfe3e7 solid;
            font-weight: bolder;
        `;
        let div = document.createElement('div');
        div.setAttribute('id', 'arfxtable_pagination');
        div.setAttribute('style', `
            text-align: right;
        `);
        let ul = document.createElement('ul');
        div.appendChild(ul);
        let prevLi = document.createElement('li');
        prevLi.setAttribute('data-page', parseInt(this.currentPage) - 1);

        if (this.currentPage == 1) {
            prevLi.setAttribute('style', `
            ${styleLi}
            margin-right: 10px;
            border-radius: 4px;
            background: #dbdbdb;
            `);
            prevLi.classList.add('arfxtable_pagination_disabled');
        } else {
            prevLi.setAttribute('style', `
            ${styleLi}
            margin-right: 10px;
            border-radius: 4px;
            color: #5a8dee;
            `);

            prevLi.setAttribute('onmouseover', `
            this.style.cursor = 'pointer';
            this.style.background = '#dee8fc';
            `)

            prevLi.setAttribute('onmouseleave', `
            this.style.background = 'none';
            `)
        }

        prevLi.innerText = 'Sebelumnya';
        ul.appendChild(prevLi);

        let dividerLi = document.createElement('li');
        dividerLi.innerText = '...';

        let pageToShow = [];
        if (this.currentPage < 5) {
            for (let i = 1; i <= totalPage; i++) {
                i <= 5 && pageToShow.push(i)
                i == 6 && pageToShow.push('...', totalPage)
            }
        } else if (this.currentPage > totalPage - 4) {
            pageToShow.push(1, '...')
            for (let i = totalPage - 4; totalPage >= i; i++) {
                pageToShow.push(i)
            }
        } else {
            pageToShow.push(1, '...', parseInt(this.currentPage) - 1, this.currentPage, parseInt(this.currentPage) + 1, '...', totalPage);
        }


        pageToShow.map((v, i, a) => {
            let li = document.createElement('li');
            li.setAttribute('data-page', v);

            if (i == 0) {
                li.setAttribute('style', `
                ${styleLi}
                border-right: 0px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                `);
            } else if (i == a.length - 1) {
                li.setAttribute('style', `
                ${styleLi}
                border-left: 0px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                `);
            } else {
                li.setAttribute('style', `
                ${styleLi}
                border-left: 0px;
                border-right: 0px;
                `);
            }

            if (v == this.currentPage) {
                li.style.background = '#5a8dee';
                li.style.color = '#ffffff';
                li.classList.add('arfxtable_pagination_disabled');

            }

            if (v == '...') {
                li.classList.add('arfxtable_pagination_disabled');
            }

            if (v != this.currentPage && v != '...') {
                li.setAttribute('onmouseover', `
                this.style.cursor = 'pointer';
                this.style.background = '#dee8fc';
                `)

                li.setAttribute('onmouseleave', `
                this.style.background = '#ffffff';
                `)
            }

            li.innerText = v;

            ul.appendChild(li);
        })


        let nextLi = document.createElement('li');
        nextLi.setAttribute('data-page', parseInt(this.currentPage) + 1);

        if (this.currentPage == totalPage) {
            nextLi.setAttribute('style', `
            ${styleLi}
            margin-left: 10px;
            border-radius: 4px;
            background: #dbdbdb;
            `);
            nextLi.classList.add('arfxtable_pagination_disabled');
        } else {
            nextLi.setAttribute('style', `
            ${styleLi}
            margin-left: 10px;
            border-radius: 4px;
            color: #5a8dee;
            `);

            nextLi.setAttribute('onmouseover', `
            this.style.cursor = 'pointer';
            this.style.background = '#dee8fc';
            `)

            nextLi.setAttribute('onmouseleave', `
            this.style.background = 'none';
            `)
        }

        nextLi.innerText = 'Selanjutnya';
        ul.appendChild(nextLi);

        //append div after target table 
        let table = document.querySelector(this.target);
        table.after(div);
        this.actionPagination();
    }

    /**
     * Actions for pagination.
     * @type {Function}
     * @returns {void}
     */
    actionPagination() {
        let pagination = document.querySelector('#arfxtable_pagination');
        let paginationButton = document.querySelectorAll('#arfxtable_pagination ul li:not(.arfxtable_pagination_disabled)');
        let self = this;
        paginationButton.forEach(
            function (v, i) {
                v.addEventListener('click', function (e) {
                    self.loader(true);
                    let page = e.currentTarget.dataset.page;
                    self.currentPage = page;
                    self.start = (self.currentPage - 1) * self.pageLength
                    self.build();
                })
            }
        )

    }

    /**
     * Build container on top of the table. 
     * @type {Function}
     * @returns {void}
     */
    buildTopContainer() {

        let table = document.querySelector(`${this.target}`);
        let div = document.createElement('div');
        div.setAttribute('id', 'arfxtable_top_container');
        div.setAttribute('style', `
            padding: 10px 0px;
            display: flex;
            justify-content: space-between;
            flex-direction: row-reverse;
        `);
        table.before(div);

        this.search && this.buildSearch();

    }

    /**
     * Build search box element.
     * @type {Function}
     * @returns {void}
     */
    buildSearch() {

        let topContainer = document.querySelector(`#arfxtable_top_container`);
        let div = document.createElement('div');
        div.setAttribute('id', 'arfxtable_search');
        let input = document.createElement('input');
        input.setAttribute('name', 'arfxtable_search');
        input.setAttribute('placeholder', 'Cari...')
        input.setAttribute('style', `
            height: 2rem;
            padding: 0px 0.6rem;
            border-radius: 0.3rem;
            border: 1px solid #dfe3e7;
            color: #676767;
        `);
        input.setAttribute('onfocus', `
            this.style.outline = '0px';
        `);
        div.appendChild(input);
        topContainer.appendChild(div)
        this.actionSearch();
    }

    /**
     * Actions for search.
     * @type {Function}
     * @returns {void}
     */
    actionSearch() {
        let search = document.querySelector(`input[name="arfxtable_search"]`);
        let self = this;

        search.addEventListener('keyup', function (e) {
            let selfSearch = this;
            self.delay(function (e) {
                self.loader(true);
                this.searchValue = selfSearch.value;
                this.build();
            }, self.searchDelay)
        })
    }


    /**
     * Build highlight search
     * @type {Function}
     * @returns {void}
     */
    buildHighlight() {
        let self = this;
        if (self.searchValue == '') return;
        let tr = document.querySelectorAll(`${this.target} tbody tr td`);
        tr.forEach(function (el, i) {
            let searchValue = new RegExp(`(${self.searchValue})`, 'ig');
            el.innerHTML = el.innerHTML.replaceAll(searchValue, `<span style="padding: 0.2em; background: ${self.highlightOptions.background}; color: ${self.highlightOptions.color};">$1</span>`);
        })

    }

    /**
     * Destroy the table 
     * @type {Function}
     * @returns {void}
     */
    destroy() {
        console.log('table destroyed');
    }

    /**
     * Function to delay an action (typing searh word).
     * @type {Function}
     * @param {callback} fn Function callback to run after idle time reached.
     * @param {number} ms Number time delay in milisecond.
     * @returns {void}
     */
    delay(fn, ms) {
        clearTimeout(this.searchTimer)
        this.searchTimer = setTimeout(fn.bind(this), ms || 0)
    }

    /**
     * Adding element to table. 
     * @type {Function}
     * @param {string} element String of element tag.
     * @param {string} position Place element at top or bottom.
     * @returns {void}
     */
    addElement(element, position) {
        let div = document.createElement('div');
        div.setAttribute('id', `arfxtable_element_${this.totalElement}`);
        div.classList.add(`arfxtable_${position}`);
        div.innerHTML = element();

        log('element:', position, element)

        let container = document.querySelector(`#arfxtable_${position}_container`);
        container.append(div);
    }

    /**
     * Get start value.
     */
    get start() {
        return this._start;
    }

    /**
     * Set start value.
     */
    set start(value) {
        this._start = value;
    }

}

/**
 * Initialize Arfxtable
 * @type {Function}
 * @param {Object} param Options of Arfxtable.
 * @returns {void}
 */
function arfxtable(param = {}) {
    return new Arfxtable(param);
}
