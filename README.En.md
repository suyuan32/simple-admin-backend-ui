<div align="center">
<img src="https://i.postimg.cc/nh8mVKkf/logo.png" width="300px" height="300px"/>
<h1>Simple Admin UI</h1>
</div>

**English** | [中文](./README.md)

## Introduction

Simple Admin UI is a modern UI for Simple Admin. It is based on vue-vben-admin and supports several advanced features. It can help you developing a distributed backend management system in a short time.

## Feature

- **State of The Art Development**：Use latest front-end technology development such as Vue3/vite2
- **TypeScript**: Application-level JavaScript language
- **Theming**: Configurable themes
- **International**：Built-in complete internationalization program
- **Mock Server** Built-in mock data scheme
- **Authority** Built-in complete dynamic routing permission generation scheme.
- **Component** Multiple commonly used components are encapsulated twice

## Support functions

- User management: The user is the system operator, and this function mainly completes the system user configuration.
- Department management: Configure the system organization (company, department, group), and the tree structure shows the support data permissions.
- Position management: configure the positions that system users belong to.
- Menu management: configure system menu, operation authority, button authority identification, interface authority, etc.
- Role management: role menu permission assignment, role setting, data range permission division by organization.
- Dictionary management: maintain some relatively fixed data frequently used in the system.
- Operation log: system normal operation log record and query; system abnormal information log record and query.
- Member management: manage registered member information
- Interface documents: Automatically generate relevant API interface documents based on business codes.
- Code generation: Generate corresponding additions, deletions, modifications, and queries based on the data table structure
- Service monitoring: View some basic information about servers

## Project Planning Progress

[RoadMap](https://github.com/suyuan32/simple-admin-core/issues/63)

### Online preview

[Online Preview](http://101.132.124.135/#/dashboard) Account: admin Password: simple-admin

#### Read Only, cannot register and modify

![pic](https://i.postimg.cc/qqPNR02x/register-zh-cn.png) ![pic](https://i.postimg.cc/PxczkCr6/dashboard-zh-cn.png)

[More](https://suyuan32.github.io/simple-admin-core/#/simple-admin/zh-cn/docs/screenshot)

## Documentation

[Simple Admin Documentation](https://vben.ryansu.pro/)

- ant-design-vue [Document](https://antdv.com/components/overview)

## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui basic use
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## Quick Start

[Quick Start Document](https://doc.ryansu.pro/en/guide/basic-config/env_setting.html)

## Change Log

[CHANGELOG](./CHANGELOG.md)

## Project

- [Simple-Admin-ui](https://github.com/suyuan32/Simple-Admin-ui)
- [Simple-Admin](https://github.com/suyuan32/Simple-Admin)

## How to contribute

You are very welcome to join！[Raise an issue](https://github.com/suyuan32/Simple-Admin-ui/issues/new/choose) Or submit a Pull Request。

**Pull Request:**

1. Fork code!
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. submit`pull request`

## Git Contribution submission specification

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` The code style is related and does not affect the running result
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development

## Related warehouse

If these plugins are helpful to you, you can give a star support

- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - Used for local and development environment data mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - Used for html template conversion and compression
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - Used for component library style introduction on demand
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - Used for online switching of theme colors and other color-related configurations
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - Used to pack compressed image resources
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - Used to pack input .gz|.brotil files
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - Used to quickly generate svg sprite

## Browser support

The `Chrome 80+` browser is recommended for local development

Support modern browsers, not IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Maintainer

[@Ryan Su](https://github.com/suyuan32)

## License

[MIT © Ryan-2022](./LICENSE)
