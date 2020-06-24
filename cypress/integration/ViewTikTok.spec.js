// let response = {
//   version: "1.0",
//   type: "video",
//   title:
//     "Spooky season dance, try it, it’s so fun #fyp #duetthis #dance #halloween #foryou",
//   author_url: "https://www.tiktok.com/@minecrafter2011",
//   author_name: "Boomer (2011)",
//   width: "100%",
//   height: "100%",
//   html:
//     '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@minecrafter2011/video/6732210815300111622" data-video-id="6732210815300111622" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@minecrafter2011" href="https://www.tiktok.com/@minecrafter2011">@minecrafter2011</a> <p>Spooky season dance, try it, it’s so fun <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp">#fyp</a> <a title="duetthis" target="_blank" href="https://www.tiktok.com/tag/duetthis">#duetthis</a> <a title="dance" target="_blank" href="https://www.tiktok.com/tag/dance">#dance</a> <a title="halloween" target="_blank" href="https://www.tiktok.com/tag/halloween">#halloween</a> <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou">#foryou</a></p> <a target="_blank" title="♬ Spooky, Scary Skeletons - Andrew Gold" href="https://www.tiktok.com/music/Spooky-Scary-Skeletons-6602666381370460933">♬ Spooky, Scary Skeletons - Andrew Gold</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
//   thumbnail_width: 540,
//   thumbnail_height: 960,
//   thumbnail_url:
//     "https://p16-tiktok-va.ibyteimg.com/obj/tos-maliva-p-0068/0p8rahu5c09t791spmlb00001644090v0200009305?x-expires=1593090000&x-signature=gcNrc9mD7hKZWvmuY0mVC92W3z8%3D",
//   provider_url: "https://www.tiktok.com",
//   provider_name: "TikTok",
// };

describe("Viewing Tik Tok", () => {
  it("displays tik tok", () => {
    cy.server();
    cy.route(
      "GET",
      "https://www.tiktok.com/oembed?url=https://vm.tiktok.com/JeJCFTp/",
      'fixture:tikTok'
    ).as("tikToks");

    cy.visit("http://localhost:3000");

    cy.wait("@tikToks").then((xhr) => {

      cy.get("[data-cy=tik-tok]").should(
          "contain",
          "Spooky season dance, try it, it’s so fun #fyp #duetthis #dance #halloween #foryou"
      );
    });
  });
});
