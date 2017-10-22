<template>
    <div v-html="htmlContent"></div>
</template>

<script>
    import * as quark from 'quark-gui';

    export default {
        name: 'MainNavigation',
        data () {
            return {
                htmlContent: "",
                header: {
                    id: 'main-header',
                    theme: 'dark',
                    logo: {
                        image: {
                            src: 'src/images/svg/flowsheet-logo-white.svg',
                            alt: 'FlowSheet logo'
                        },
                        url: "#"
                    },
                    sidebar: {
                        sidebarNavigation: {
                            listItems: [
                                {
                                    name: "About",
                                    link: "",
                                    iconClass: "fa fa-info-circle"
                                },
                                {
                                    name: "Developers",
                                    link: "",
                                    iconClass: "fa fa-code"
                                },
                                {
                                    name: "Send feedback",
                                    link: "",
                                    iconClass: "fa fa-comment"
                                }
                            ]
                        }
                    }
                }
            }
        },
        created: function () {
            this.htmlContent = quark.Organisms.Global.Header.getModule(this.header);
        }
    }
</script>



