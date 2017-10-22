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
                            src: 'src/images/svg/flowsheet-logo-gray-vertical.svg',
                            alt: 'FlowSheet logo'
                        },
                        url: '/'
                    },
                    content: `
                        <div class="text-center">
                            <p>FlowSheet licensed under <a href="https://github.com/flowgig/FlowSheet/blob/master/LICENSE">GNU General Public License</a></p>
                            <p><a href="#">About</a> - <a href="#">Developers</a> - <a href="#">Send feedback</a></p>
                        </div>
			        `
                });
                return footerElement;
            }
        }
    }
</script>
