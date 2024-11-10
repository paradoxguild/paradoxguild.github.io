class AlpineComponent extends HTMLElement {
  verifyAttributes(argList, message) {
    if (this.hasAttribute('skip-attribute-verification')) {
      return;
    }
    _verifyAttributes(this, argList, message);
  }

  verifyXData(argList, message) {
    _verifyXData(this, argList, message);
  }

  connectedCallback() {
    const slots = [];
    this.querySelectorAll('[slot]').forEach(slotElement => {
      slots.push({ target: slotElement.getAttribute('slot'), innerHTML: slotElement.innerHTML });
      slotElement.remove();
    });

    slots.forEach(slots => {
      this.querySelector('[slot="' + slots.target + '"]').innerHTML = slots.innerHTML;
    });
  }
}

class TabContainer extends AlpineComponent {
  connectedCallback() {
    this.verifyAttributes(['selected'], 'TabContainer requires attributes: [selected]');

    const params = new URLSearchParams(window.location.search);
    if (params.has('tab')) {
      this.setAttribute('selected', params.get('tab'));
    }

    this.setAttribute('x-data', `{ selectedTab: '${this.getAttribute('selected')}' }`);
    this.setAttribute('class', 'w-full');
    super.connectedCallback();
  }
}

class TabButtonContainer extends AlpineComponent {
  connectedCallback() {
    // this.setAttribute('x-on:keydown.right.prevent', '$focus.wrap().next()');
    // this.setAttribute('x-on:keydown.left.prevent', '$focus.wrap().previous()');
    this.setAttribute('role', 'tablist');
    this.setAttribute('aria-label', 'tab options');
    this.setAttribute('class', 'flex justify-center w-full gap-2 overflow-x-auto border-b border-gray-500 dark:border-gray-500');
    super.connectedCallback();
  }
}

class TabButton extends AlpineComponent {
  connectedCallback() {
    this.verifyAttributes(['id', 'label', 'target'], 'TabButton requires attributes: [id, label, target]');
    const id = this.getAttribute('id');
    const label = this.getAttribute('label');
    const target = this.getAttribute('target');
    this.innerHTML = `
      <button @click="selectedTab = '${id}'"
          :aria-selected="selectedTab === '${id}'"
          :tabindex="selectedTab === '${id}' ? '0' : '-1'"
          :class="selectedTab === '${id}' ? 'font-bold text-sky-900 border-b-2 border-sky-900 dark:border-teal-400 dark:text-teal-400' : 'text-gray-800 font-medium dark:text-gray-300 dark:hover:border-b-gray-300 dark:hover:text-gray-100 hover:border-b-2 hover:border-b-gray-900 hover:text-gray-950'"
          class="h-min px-2 py-2 text-sm" type="button" role="tab" aria-controls="${target}">${label}</button>
    `;
    super.connectedCallback();
  }
}

class TabPanelContainer extends AlpineComponent {
  connectedCallback() {
    this.setAttribute('class', 'w-full max-w-[1000px] mx-auto flex flex-col py-4 text-gray-800 dark:text-gray-300');
    super.connectedCallback();
  }
}

class TabPanel extends AlpineComponent {
  connectedCallback() {
    this.verifyAttributes(['tab', 'id'], 'TabPanel requires attributes: [id, tab]');
    const tab = this.getAttribute('tab');
    const id = this.getAttribute('id');
    this.setAttribute('x-show', `selectedTab === '${tab}'`);
    this.setAttribute('role', 'tabpanel');
    this.setAttribute('aria-label', id);
    super.connectedCallback();
  }
}

class CTALink extends AlpineComponent {
  connectedCallback() {
    this.verifyAttributes(['prefix', 'callout', 'href'], 'CTALink requires attributes: [prefix, callout, href]');
    this.innerHTML = `
      <span class="text-gray-800 dark:text-gray-300">
        ${this.getAttribute('prefix')}
        <a href="${this.getAttribute('href')}" class="font-medium text-sky-900 underline-offset-2 hover:underline focus:underline focus:outline-none dark:text-teal-400">
          ${this.getAttribute('callout')}
          ${this.hasAttribute('no-arrow') ? '' : `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true" stroke="currentColor" class="size-4 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          `}
        </a>
      </span>
    `;
  }
}

class WowRestrictedItem extends AlpineComponent {
  connectedCallback() {
    this.verifyAttributes(['x-data'], 'WowDescriptiveItem requires attributes: [x-data={image, lines}]');
    this.verifyXData(['image'], 'WowDescriptiveItem requires attributes: [x-data={image, lines}]');
    const width = this.hasAttribute('no-description') ? '350px' : '310px';
    const height = this.hasAttribute('no-description') ? '295px' : '415px';
    this.innerHTML = `
      <div class="group flex rounded-md flex-col overflow-hidden border border-gray-500 bg-[#242424] text-gray-300 h-[${height}]">
        <div class="py-4 my-auto">
          <div class="overflow-hidden mx-auto flex transition duration-700 ease-out group-hover:scale-[1.1]">
            <img :src="image" class="w-[${width}] h-auto mx-auto" alt="WoW Restricted Item" />
          </div>
        </div>
        ${this.hasAttribute('no-description') ? '' : `
          <div class="flex flex-col justify-start gap-2 py-2 px-4 bg-zinc-900 h-[120px] mt-auto" x-show="lines && lines.length">
            <h3 class="text-balance text-xl lg:text-2xl font-bold text-gray-950 dark:text-gray-100" aria-describedby="featureDescription">
              Restrictions
            </h3>
            <p id="featureDescription" class="text-pretty text-sm">
              <template x-for="(line, idx) in lines">
                <p x-text="(idx + 1) + '. ' + line"></li>
              </template>
            </p>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('alpine-component', AlpineComponent);
customElements.define('tab-container', TabContainer);
customElements.define('tab-button-container', TabButtonContainer);
customElements.define('tab-button', TabButton);
customElements.define('tab-panel-container', TabPanelContainer);
customElements.define('tab-panel', TabPanel);
customElements.define('cta-link', CTALink);
customElements.define('wow-restricted-item', WowRestrictedItem);