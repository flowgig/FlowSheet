<template>
    <div v-html="htmlContent"></div>
</template>

<script>
    import * as quark from 'quark-gui';

    export default {
        name: 'MainFooter',
        data () {
            return {
                htmlContent: this.createFooterElement()
            }
        },
        methods: {
            createFooterElement: function () {
                var footerElement = quark.Organisms.Global.Footer.getModule({
                    logo: {
                        image: {
                            src: '',//TOTO add logo require('../../images/svg/flowgig-logo-gray.svg'),
                            alt: 'ChordPro Editor logo'
                        },
                        url: '/'
                    },
                    content: `
                        <div class="text-center">
                            <p>ChordPro Editor licensed under <a href="https://github.com/benjamindehli/ChordPro-test/blob/master/LICENSE">GNU General Public License</a></p>
                            <p><a href="#">About</a> - <a href="#">Developers</a> - <a href="#">Send feedback</a></p>
                        </div>
			        `
                });
                return footerElement;
            }
        }
    }
</script>
