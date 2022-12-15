import { c as create_ssr_component, s as setContext, e as escape, b as compute_rest_props, d as createEventDispatcher, g as getContext, f as subscribe, h as spread, i as escape_object, j as is_void, k as add_attribute, l as compute_slots, v as validate_component } from "../../chunks/index.js";
import { p as page, I as Icon } from "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { w as writable } from "../../chunks/index2.js";
const theme = "";
const all = "";
const app = "";
const cBase$1 = "grid grid-rows-[auto_1fr_auto] overflow-y-auto";
const AppRail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let { selected = writable(void 0) } = $$props;
  let { background = "bg-surface-100-800-token" } = $$props;
  let { active = "bg-primary-active-token" } = $$props;
  let { hover = "bg-primary-hover-token" } = $$props;
  let { width = "w-[70px] sm:w-20" } = $$props;
  let { height = "h-full" } = $$props;
  let { gap = "gap-0" } = $$props;
  let { regionLead = "" } = $$props;
  let { regionDefault = "" } = $$props;
  let { regionTrail = "" } = $$props;
  setContext("selected", selected);
  setContext("active", active);
  setContext("hover", hover);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.regionLead === void 0 && $$bindings.regionLead && regionLead !== void 0)
    $$bindings.regionLead(regionLead);
  if ($$props.regionDefault === void 0 && $$bindings.regionDefault && regionDefault !== void 0)
    $$bindings.regionDefault(regionDefault);
  if ($$props.regionTrail === void 0 && $$bindings.regionTrail && regionTrail !== void 0)
    $$bindings.regionTrail(regionTrail);
  classesBase = `${cBase$1} ${background} ${width} ${height} ${gap} ${$$props.class || ""}`;
  return `

<div class="${"app-rail " + escape(classesBase, true)}">
	<div class="${"app-bar-lead " + escape(regionLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>
	
	<div class="${"app-bar-default " + escape(regionDefault, true)}">${slots.default ? slots.default({}) : ``}</div>
	
	<div class="${"app-bar-trail " + escape(regionTrail, true)}">${slots.trail ? slots.trail({}) : ``}</div></div>`;
});
const cBase = "grid place-content-center place-items-center w-full aspect-square space-y-1.5";
const AppRailTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesActive;
  let classesBase;
  let $$restProps = compute_rest_props($$props, ["value", "tag", "label", "regionIcon", "regionLabel", "selected", "active", "hover"]);
  let $selected, $$unsubscribe_selected;
  createEventDispatcher();
  let { value = void 0 } = $$props;
  let { tag = "button" } = $$props;
  let { label = "" } = $$props;
  let { regionIcon = "" } = $$props;
  let { regionLabel = "text-xs" } = $$props;
  let { selected = getContext("selected") } = $$props;
  $$unsubscribe_selected = subscribe(selected, (value2) => $selected = value2);
  let { active = getContext("active") } = $$props;
  let { hover = getContext("hover") } = $$props;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.regionIcon === void 0 && $$bindings.regionIcon && regionIcon !== void 0)
    $$bindings.regionIcon(regionIcon);
  if ($$props.regionLabel === void 0 && $$bindings.regionLabel && regionLabel !== void 0)
    $$bindings.regionLabel(regionLabel);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  classesActive = $selected && value && $selected === value ? `${active}` : "";
  classesBase = `${cBase} ${hover} ${classesActive} ${$$props.class || ""}`;
  $$unsubscribe_selected();
  return `

${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        escape_object(prunedRestProps()),
        {
          class: "app-rail-tile " + escape(classesBase, true)
        }
      ],
      {}
    )}>${is_void(tag$1) ? "" : `
	<div class="${"app-rail-tile-icon " + escape(regionIcon, true)}">${slots.default ? slots.default({}) : ``}</div>
	
	${label ? `<div class="${"app-rail-tile-label " + escape(regionLabel, true)}">${escape(label)}</div>` : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const cBaseAppShell = "w-full h-full flex flex-col overflow-hidden";
const cContentArea = "w-full h-full flex overflow-hidden";
const cPage = "flex-1 overflow-x-hidden overflow-y-auto flex flex-col";
const cSidebarLeft = "flex-none overflow-x-hidden overflow-y-auto";
const cSidebarRight = "flex-none overflow-x-hidden overflow-y-auto";
const AppShell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesheader;
  let classesSidebarLeft;
  let classesSidebarRight;
  let classesPageHeader;
  let classesPageContent;
  let classesPageFooter;
  let classesFooter;
  let $$slots = compute_slots(slots);
  let { slotHeader = "z-10" } = $$props;
  let { slotSidebarLeft = "w-auto" } = $$props;
  let { slotSidebarRight = "w-auto" } = $$props;
  let { slotPageHeader = "" } = $$props;
  let { slotPageContent = "" } = $$props;
  let { slotPageFooter = "" } = $$props;
  let { slotFooter = "" } = $$props;
  if ($$props.slotHeader === void 0 && $$bindings.slotHeader && slotHeader !== void 0)
    $$bindings.slotHeader(slotHeader);
  if ($$props.slotSidebarLeft === void 0 && $$bindings.slotSidebarLeft && slotSidebarLeft !== void 0)
    $$bindings.slotSidebarLeft(slotSidebarLeft);
  if ($$props.slotSidebarRight === void 0 && $$bindings.slotSidebarRight && slotSidebarRight !== void 0)
    $$bindings.slotSidebarRight(slotSidebarRight);
  if ($$props.slotPageHeader === void 0 && $$bindings.slotPageHeader && slotPageHeader !== void 0)
    $$bindings.slotPageHeader(slotPageHeader);
  if ($$props.slotPageContent === void 0 && $$bindings.slotPageContent && slotPageContent !== void 0)
    $$bindings.slotPageContent(slotPageContent);
  if ($$props.slotPageFooter === void 0 && $$bindings.slotPageFooter && slotPageFooter !== void 0)
    $$bindings.slotPageFooter(slotPageFooter);
  if ($$props.slotFooter === void 0 && $$bindings.slotFooter && slotFooter !== void 0)
    $$bindings.slotFooter(slotFooter);
  classesBase = `${cBaseAppShell} ${$$props.class ?? ""}`;
  classesheader = `${slotHeader}`;
  classesSidebarLeft = `${cSidebarLeft} ${slotSidebarLeft}`;
  classesSidebarRight = `${cSidebarRight} ${slotSidebarRight}`;
  classesPageHeader = `${slotPageHeader}`;
  classesPageContent = `${slotPageContent}`;
  classesPageFooter = `${slotPageFooter}`;
  classesFooter = `${slotFooter}`;
  return `<main id="${"appShell"}"${add_attribute("class", classesBase, 0)} data-testid="${"app-shell"}">
	${$$slots.header ? `<header id="${"shell-header"}" class="${"flex-none " + escape(classesheader, true)}">${slots.header ? slots.header({}) : ``}</header>` : ``}

	
	<div class="${"flex-auto " + escape(cContentArea, true)}">
		${$$slots.sidebarLeft ? `<aside id="${"sidebar-left"}"${add_attribute("class", classesSidebarLeft, 0)}>${slots.sidebarLeft ? slots.sidebarLeft({}) : ``}</aside>` : ``}

		
		<div id="${"page"}"${add_attribute("class", cPage, 0)}>
			${$$slots.pageHeader ? `<header id="${"page-header"}" class="${"flex-none " + escape(classesPageHeader, true)}">${slots.pageHeader ? slots.pageHeader({}) : `(slot:header)`}</header>` : ``}

			
			<div id="${"page-content"}" class="${"flex-auto " + escape(classesPageContent, true)}">${slots.default ? slots.default({}) : ``}</div>

			
			${$$slots.pageFooter ? `<footer id="${"page-footer"}" class="${"flex-none " + escape(classesPageFooter, true)}">${slots.pageFooter ? slots.pageFooter({}) : `(slot:footer)`}</footer>` : ``}</div>

		
		${$$slots.sidebarRight ? `<aside id="${"sidebar-right"}"${add_attribute("class", classesSidebarRight, 0)}>${slots.sidebarRight ? slots.sidebarRight({}) : ``}</aside>` : ``}</div>

	
	${$$slots.footer ? `<footer id="${"shell-footer"}" class="${"flex-none " + escape(classesFooter, true)}">${slots.footer ? slots.footer({}) : ``}</footer>` : ``}</main>`;
});
const appRailValue = writable(1);
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  function checkNumber() {
    let name = String($page.url).split("/");
    name = name[name.length - 1];
    console.log(name);
    if (name === "") {
      return 1;
    }
    if (name === "powerguide") {
      return 2;
    }
  }
  appRailValue.set(checkNumber());
  let val = 0;
  appRailValue.subscribe((v) => val = v);
  $$unsubscribe_page();
  return `${validate_component(AppShell, "AppShell").$$render($$result, {}, {}, {
    pageFooter: () => {
      return `Page Footer`;
    },
    sidebarLeft: () => {
      return `${validate_component(AppRail, "AppRail").$$render($$result, { selected: appRailValue }, {}, {
        trail: () => {
          return `${validate_component(AppRailTile, "AppRailTile").$$render(
            $$result,
            {
              tag: "a",
              href: "https://github.com/LuMiSxh"
            },
            {},
            {
              default: () => {
                return `${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:github", width: "45" }, {}, {})}`;
              }
            }
          )}
			`;
        },
        lead: () => {
          return `${validate_component(AppRailTile, "AppRailTile").$$render($$result, { tag: "button" }, {}, {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "mdi:anonymous-circle",
                  width: "60"
                },
                {},
                {}
              )}`;
            }
          })}
			`;
        },
        default: () => {
          return `
			${validate_component(AppRailTile, "AppRailTile").$$render(
            $$result,
            {
              tag: "a",
              href: "/",
              label: "Home",
              title: "Home",
              value: 1
            },
            {},
            {
              default: () => {
                return `${val === 1 ? `${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:package-variant", width: "35" }, {}, {})}` : `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    icon: "mdi:package-variant-closed",
                    width: "35"
                  },
                  {},
                  {}
                )}`}`;
              }
            }
          )}
			${validate_component(AppRailTile, "AppRailTile").$$render(
            $$result,
            {
              tag: "a",
              href: "/powerguide",
              label: "PowerGuide",
              title: "PowerGuide",
              value: 2
            },
            {},
            {
              default: () => {
                return `${val === 2 ? `${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:package-variant", width: "35" }, {}, {})}` : `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    icon: "mdi:package-variant-closed",
                    width: "35"
                  },
                  {},
                  {}
                )}`}`;
              }
            }
          )}`;
        }
      })}
	`;
    },
    default: () => {
      return `
	${slots.default ? slots.default({}) : ``}
	`;
    }
  })}`;
});
export {
  Layout as default
};
