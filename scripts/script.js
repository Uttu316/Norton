$(() => {
  smoothScrolltoId();
  accordions();
  toggleProductCardValues();
  stickyCTA();
  let productsList = carousel(
    "#slider-container",
    false,
    "#slider-btn-left",
    "#slider-btn-right",
    true
  );
  let awardsList = carousel(
    "#awards",
    true,
    "#awards-carousel-leftbtn",
    "#awards-carousel-rightbtn",
    false
  );

  tabs(productsList);
  handleCarouselChange(productsList);
});

let smoothScrolltoId = () => {
  let clickedElement = $("a[href^='#']");
  clickedElement.on("click", function(event) {
    event.preventDefault();
    $("html,body").animate(
      {
        scrollTop: $(this.hash).offset().top
      },
      800
    );
  });
};

let tabs = productsList => {
  $(".tab-container:first-child").show();
  $(".tab").on("click", function() {
    let currentTab = $(this);
    let currentTabType = currentTab.parent();
    let targetContainerId = $(currentTab.data("target"));
    currentTab.siblings().removeClass("active");
    currentTab.addClass("active");
    if (currentTabType[0].id === "first-tabs") {
      targetContainerId.show();
      targetContainerId.siblings().hide();
    } else {
      let activeTabIndex = currentTab.data("slickIndex");
      productsList.slick("slickGoTo", activeTabIndex);
      targetContainerId.css("opacity", 1);
      targetContainerId.siblings().css("opacity", 0.35);
    }
  });
  $(".tab:first-child").trigger("click");
};

//add pannel-open class in div of pannel-container class and replace + with - to its pannel-icon for default open
let accordions = () => {
  $(".pannel").on("click", function() {
    let currentPannel = $(this);
    let currentPannelType = currentPannel.parent();
    if (currentPannelType[0].id === "footer-accordions") {
      currentPannel.next().is(":hidden")
        ? currentPannel.find(".pannel-icon").html("–")
        : currentPannel.find(".pannel-icon").html("+");
      currentPannel.next().slideToggle();
    } else {
      currentPannelType.find(".pannel-icon").html("+");
      $(".security-pannel-container").slideUp();
      if (currentPannel.next().is(":hidden")) {
        currentPannel.find(".pannel-icon").html("–");
        currentPannel.next().slideDown();
      } else {
        currentPannel.next().slideUp();
      }
    }
  });
};

let toggleProductCardValues = () => {
  let switchBtn = $("#switch");
  $(".yearly").hide();
  switchBtn.on("click", () => {
    $("#switch>div").toggleClass("move-switch");
    let showYearly = $("#switch>div").hasClass("move-switch");
    if (showYearly) {
      $(".monthly").hide();
      $(".yearly").show();
    } else {
      $(".yearly").hide();
      $(".monthly").show();
    }
  });
};
let stickyCTA = () => {
  $(document).scroll(function() {
    let currentPosition = $(this).scrollTop();
    let isLifelockTabActive = $("#lifelock-tab-container").is(":visible");
    if (currentPosition > 800 && isLifelockTabActive) {
      $("#sticky-plan-pricing").fadeIn();
    } else {
      $("#sticky-plan-pricing").fadeOut();
    }
  });
};

let carousel = (
  id,
  isInfinite = true,
  leftBtnId,
  rightBtnId,
  containerWidth = true
) => {
  let Slick = $(id).slick({
    infinite: isInfinite,
    dots: false,
    arrows: true,
    swipe: true,
    autoplay: false,
    variableWidth: containerWidth,
    speed: 500,
    prevArrow: $(leftBtnId),
    nextArrow: $(rightBtnId)
  });
  return Slick;
};

let handleCarouselChange = productsList => {
  productsList.on("afterChange", function(event, slick, currentSlide) {
    let productsTabs = $("#second-tabs .tab");
    let currentTab = $(productsTabs[currentSlide]);
    let targetContainerId = $(currentTab.data("target"));
    productsTabs.removeClass("active");
    currentTab.addClass("active");
    targetContainerId.css("opacity", 1);
    targetContainerId.siblings().css("opacity", 0.35);
  });
};
