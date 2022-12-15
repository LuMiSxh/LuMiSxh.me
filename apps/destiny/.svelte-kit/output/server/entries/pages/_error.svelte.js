import { c as create_ssr_component, e as escape, l as compute_slots, f as subscribe, v as validate_component } from "../../chunks/index.js";
import { p as page, I as Icon } from "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
let cBaseCard = "flex flex-col items-start lg:items-center lg:flex-row p-5 space-y-4 lg:space-y-0 lg:space-x-4 shadow";
let cLead = "flex justify-center items-center";
let cContent = "flex flex-col w-full justify-center space-y-2";
let cTrail = "flex items-center space-x-4";
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesCard;
  let classesLead;
  let classesContent;
  let classesTrail;
  let $$slots = compute_slots(slots);
  let { visible = true } = $$props;
  let { background = "bg-tertiary-500/20" } = $$props;
  let { border = "border border-tertiary-500" } = $$props;
  let { color = "" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { duration = 200 } = $$props;
  let { slotLead = "" } = $$props;
  let { slotContent = "" } = $$props;
  let { slotTrail = "" } = $$props;
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0)
    $$bindings.slotLead(slotLead);
  if ($$props.slotContent === void 0 && $$bindings.slotContent && slotContent !== void 0)
    $$bindings.slotContent(slotContent);
  if ($$props.slotTrail === void 0 && $$bindings.slotTrail && slotTrail !== void 0)
    $$bindings.slotTrail(slotTrail);
  classesCard = `${cBaseCard} ${background} ${border} ${color} ${rounded} ${$$props.class ?? ""}`;
  classesLead = `${cLead} ${slotLead}`;
  classesContent = `${cContent} ${slotContent}`;
  classesTrail = `${cTrail} ${slotTrail}`;
  return `${visible ? `<div class="${"alert " + escape(classesCard, true)}" data-testid="${"alert"}" role="${"alert"}" aria-live="${"polite"}">
		${$$slots.lead ? `<section class="${"alert-lead " + escape(classesLead, true)}">${slots.lead ? slots.lead({}) : ``}</section>` : ``}

		
		<section class="${"alert-content " + escape(classesContent, true)}">
			${$$slots.title ? `<h3 class="${"alert-title"}">${slots.title ? slots.title({}) : ``}</h3>` : ``}
			
			${$$slots.default ? `<div class="${"alert-message " + escape(color, true)}">${slots.default ? slots.default({}) : ``}</div>` : ``}</section>

		
		${$$slots.trail ? `<section class="${"alert-trail " + escape(classesTrail, true)}">${slots.trail ? slots.trail({}) : ``}</section>` : ``}</div>` : ``}`;
});
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<main class="${"h-full w-full p-5"}">${validate_component(Alert, "Alert").$$render($$result, { visible: true }, {}, {
    title: () => {
      return `${escape($page.status)}`;
    },
    lead: () => {
      return `${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "material-symbols:error",
          width: "60"
        },
        {},
        {}
      )}`;
    },
    default: () => {
      return `<span>${escape($page.error.message)}</span>`;
    }
  })}</main>`;
});
export {
  Error as default
};
