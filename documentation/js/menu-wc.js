'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">spellsword-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' : 'data-target="#xs-controllers-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' :
                                            'id="xs-controllers-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' }>
                                            <li class="link">
                                                <a href="controllers/ApiController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' : 'data-target="#xs-injectables-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' :
                                        'id="xs-injectables-links-module-ApiModule-cff43e6c65f2aff3c748cf8c091d461f6a8073b2f6c96ecf553bd7a44bd6e7dfcb1197744be613aec3e6846be99f09f25b9ecb7fef8e9e5f471ccf62379f4ea8"' }>
                                        <li class="link">
                                            <a href="injectables/ApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' : 'data-target="#xs-controllers-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' :
                                            'id="xs-controllers-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' : 'data-target="#xs-injectables-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' :
                                        'id="xs-injectables-links-module-AuthModule-0fec5d2da13501b2ac18e9c99b819d023e41e2dbe56519c2e34c4ed0118a4a021925c9e506e0dfa5a420f3ca248af24c335d769c5fbd3e8b1f9c76d2145697c2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GamesModule.html" data-type="entity-link" >GamesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GamesModule-e6f3b2424fbf73a2df38dba487d93b729994e4829fcf01617f43f2feceb172552d93e6dfbf9ebe20fdc6241426232946ff96be2219965c26ca020ed237d52718"' : 'data-target="#xs-injectables-links-module-GamesModule-e6f3b2424fbf73a2df38dba487d93b729994e4829fcf01617f43f2feceb172552d93e6dfbf9ebe20fdc6241426232946ff96be2219965c26ca020ed237d52718"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GamesModule-e6f3b2424fbf73a2df38dba487d93b729994e4829fcf01617f43f2feceb172552d93e6dfbf9ebe20fdc6241426232946ff96be2219965c26ca020ed237d52718"' :
                                        'id="xs-injectables-links-module-GamesModule-e6f3b2424fbf73a2df38dba487d93b729994e4829fcf01617f43f2feceb172552d93e6dfbf9ebe20fdc6241426232946ff96be2219965c26ca020ed237d52718"' }>
                                        <li class="link">
                                            <a href="injectables/GamesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GamesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayModule.html" data-type="entity-link" >PlayModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-cd4711ae2d2d7e7738c9a4643a46e4f99e465de61de8d60485663a2ace1fc72ab2cd4bdae8790a6913dc7596c45f21938fbec4dd70a6c48390a2debde9672406"' : 'data-target="#xs-injectables-links-module-UsersModule-cd4711ae2d2d7e7738c9a4643a46e4f99e465de61de8d60485663a2ace1fc72ab2cd4bdae8790a6913dc7596c45f21938fbec4dd70a6c48390a2debde9672406"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-cd4711ae2d2d7e7738c9a4643a46e4f99e465de61de8d60485663a2ace1fc72ab2cd4bdae8790a6913dc7596c45f21938fbec4dd70a6c48390a2debde9672406"' :
                                        'id="xs-injectables-links-module-UsersModule-cd4711ae2d2d7e7738c9a4643a46e4f99e465de61de8d60485663a2ace1fc72ab2cd4bdae8790a6913dc7596c45f21938fbec4dd70a6c48390a2debde9672406"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConnectUserDto.html" data-type="entity-link" >ConnectUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameGateway.html" data-type="entity-link" >GameGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatchmakeGateway.html" data-type="entity-link" >MatchmakeGateway</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});