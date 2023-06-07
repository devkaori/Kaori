const Discord = require('discord.js');
const ms = require('ms');

let timeLength = 50000;
module.exports = async (client, interaction, args) => {

    let list = `Parce que nous étions perdus, nous avons dû revenir par où nous sommes venus.
    Il est dans un boys band, ce qui n'a pas beaucoup de sens pour un serpent.
    Un canard mort ne vole pas en arrière.
    Ne pisse pas dans mon jardin et dis-moi que tu essaies d'aider mes plantes à pousser.
    Son cri a fait taire les adolescents bruyants.
    Les membres de l'équipe étaient difficiles à distinguer car ils avaient tous les cheveux attachés en queue de cheval.
    J'entends dire que Nancy est très jolie.
    Les colonies nudistes rejettent la couture en feuilles de figuier.
    Une chanson peut rendre ou ruiner la journée d'une personne si elle se laisse envahir par celle-ci.
    Elle ne voyait aucune ironie à me demander de changer tout en voulant que je l'accepte telle qu'elle est.
    Le passe-temps préféré de mon oncle était de construire des voitures en nouilles.
    Finalement, il a réalisé qu'il pouvait voir le son et entendre les mots.
    Cherche une recette de soupe au poulet sur internet.
    Il n'a pas fallu longtemps à Gary pour remarquer que les cambrioleurs étaient des amateurs.
    Comment t'es-tu blessé ?
    Il était évident qu'elle avait chaud, qu'elle transpirait et qu'elle était fatiguée.
    Il avait l'air confus de manière déconcertante.
    L'amour n'est pas comme une pizza.
    C'était toujours dangereux de conduire avec lui car il insistait pour dire que les cônes de sécurité étaient un parcours de slalom.
    En attendant que l'eau de la douche se réchauffe, il a remarqué qu'il pouvait entendre l'eau changer de température.
    Salutations de la galaxie MACS0647-JD, ou ce que nous appelons chez nous.
    Le monde a beaucoup changé au cours des dix dernières années.
    Lorsqu'il est entré dans l'église, il a pu entendre la voix douce de quelqu'un qui parlait à un téléphone portable.
    Maintenant, je dois réfléchir à mon existence et me demander si je suis réellement réel.
    Le temps d'hier était propice à l'escalade.
    Les gaufres sont toujours meilleures sans fourmis de feu et puces.
    Nancy était fière de diriger un navire échoué.
    Il était tellement préoccupé par le fait de savoir s'il le pouvait ou non qu'il a omis de se demander s'il devait le faire.
    Si manger des omelettes aux trois œufs fait prendre du poids, les œufs de perruche sont un bon substitut.
    Je ne respecte personne qui ne peut pas faire la différence entre Pepsi et Coca-Cola.
    Il a trouvé la fin de l'arc-en-ciel et a été surpris de ce qu'il a trouvé là-bas.
    Il s'est demandé pourquoi à 18 ans, il était assez vieux pour aller à la guerre, mais pas assez vieux pour acheter des cigarettes.
    Elle habitait sur Monkey Jungle Road et cela semblait expliquer toute sa bizarrerie.
    Julie veut un mari parfait.
    Puis-je te proposer quelque chose à boire ?
    Attends dehors, devant la maison.
    Son fils a plaisanté en disant que les barres énergétiques n'étaient rien de plus que des barres de bonbons pour adultes.
    Ma sœur aînée ressemble à ma mère.
    La végétation dense et les lianes entrelacées rendaient la randonnée presque impossible.
    Un joyau étincelant ne suffit pas.
    Trente ans plus tard, elle pensait toujours qu'il était acceptable de mettre le rouleau de papier toilette en dessous plutôt qu'au-dessus.
    Chaque personne qui te connaît a une perception différente de qui tu es.
    Descends les escaliers avec précaution.
    Affrontant sa plus grande peur, il a mangé sa première guimauve.
    Elle pleurait des diamants.
    Demain apportera quelque chose de nouveau, alors laisse aujourd'hui en souvenir.
    Erin a accidentellement créé un nouvel univers.
    David préfère la stratégie consistant à "fourrer sa tente dans le sac" plutôt qu'à la plier soigneusement.
    La serveuse n'était pas amusée lorsqu'il a commandé des œufs verts et du jambon.
    Tout ce que tu as à faire, c'est de prendre le stylo et de commencer.`;

    async function start() {
        const inGame = new Set();
        const filter = m => m.author.id === interaction.user.id;
        if (inGame.has(interaction.user.id)) return;
        inGame.add(interaction.user.id);
        var i;
        for (i = 0; i < 25; i++) {
            const time = Date.now();

            list = list.split("\n");
            let sentenceList = list[Math.floor(Math.random() * list.length)];

            let sentence = '';
            let ogSentence = sentenceList.toLowerCase().replace("    ", "");

            ogSentence.split(' ').forEach(argument => {
                sentence += '`' + argument.split('').join(' ') + '` '
            });

            await client.embed({
                title: `💬・FastType`,
                desc: `Écris ceci en ${ms(timeLength, { long: true })} ! \n${sentence}`,
                type: 'editreply'
            }, interaction)

            try {
                var msg = await interaction.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: timeLength,
                    errors: ['time']
                });
            } catch (ex) {
                client.errNormal({
                    error: "Le temps est écoulé !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (['cancel', 'end'].includes(msg.first().content.toLowerCase().trim())) {
                msg.first().delete();
                client.succNormal({
                    text: "Terminé !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break
            } else if (msg.first().content.toLowerCase().trim() === ogSentence.toLowerCase()) {
                msg.first().delete();
                client.succNormal({
                    text: `Tu l'as fait en ${ms(Date.now() - time, { long: true })} !`,
                    type: 'editreply'
                }, interaction)
                break;
            } else {
                client.errNormal({
                    error: "Malheureusement, tu n'as pas réussi !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (i === 25) {
                client.succNormal({ text: `Tu l'as fait !`, type: 'editreply' }, interaction)
                inGame.delete(interaction.user.id)
                break
            }
        }
    }

    start()
}
