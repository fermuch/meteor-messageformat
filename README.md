# meteor-messageformat (v2) [![Build Status](https://api.travis-ci.org/gadicc/meteor-messageformat.svg?branch=v2)](https://travis-ci.org/gadicc/meteor-messageformat)

MessageFormat i18n support, the Meteor way.

Easy reactive use of complicated strings (gender, plural, etc) with insanely
easy translation into other languages (through a web UI).

For full info, docs and examples, see the
[Meteor MessageFormat home page](http://messageformat.meteor.com/)
(or install/clone the smart package and run `meteor` in its `website` directory).

**THIS IS AN IN-DEVELOPMENT RELEASE.  YOU SHOULD NOT BE USING IT UNLESS YOU KNOW
WHAT YOU'RE DOING.  SEE THE VERY END OF THIS DOCUMENT FOR SOME MORE HELP**.

## Quick Start

The most common configuration involves:

```bash
$ meteor add msgfmt:core msgfmt:extract msgfmt:ui
```

In your common code (for client + server), add:

```js
msgfmt.init('en');
```

where `en` should be your "native" language, i.e. the language all your
strings are in before any translation occurs.  You can supply an optional
second argument with a key-value dictionary of configuration values, see
the [docs](http://messageformat.meteor.com/docs) for more.

Setup your strings like this:

```handlebars
<h1>{{mf 'heading_welcome' 'Welcome to my Site'}}</h1>
<p>{{mf 'welcome_name' 'Welcome, {NAME}' NAME=getUserName}}</p>
```

For more complicated examples, see the
[examples page](http://messageformat.meteor.com/examples).
For more information about different options, see the
[docs](http://messageformat.meteor.com/docs).

To translate your strings, go to `/translate` in your app, available by default
to any registered user.  See the [docs](http://messageformat.meteor.com/docs)
about custom security policies.

## More info

### Debug logging

`Logger.setLevel('msgfmt', 'trace');`

### Reactivity

* `msgfmt.locale()` is a reactive dependency on the current locale.  When
calling `setLocale()`, the value might only change when language data is
ready, depending on the value of `msgfmt.waitOnLoaded`.

* `msgfmt.lang()` is a reactive dependency on the current language.  This
is only the language component of the locale, not the dialect / cultural /
regional settings.  e.g. locale `en_US` has a lang of `en`.

* `msgfmt.dir()` is a reactive dependency on the writing direction of the
current language, either `ltr` or `rtl`.  By default,
`msgfmt.setBodyDir = true` and we'll change set the `dir` attribute on
your page's `body` tag (which you can leverage with appropriate CSS rules).

### Differences from v0

* The main package is now `msgfmt:core`.

* The translation UI is now a separate package, `msgfmt:ui`.

* `mf_extract` is no more.  Install `msgfmt:extract` and forget about it,
everything is automatic.

* The main package namespace is now `msgfmt` and not `mfPkg`.  However,
`mfPkg` still exists as an alias so no need to change existing code.

* Use `msgfmt.setLocale(locale)` to set the locale.

* During initial page load, language data is loaded in parallel with a 2nd
http request.  This is cached in localStorage if `msgfmt.useLocalStorage =
true`.  On subsequent visits, only new/changed strings are downloaded.

* Offline support is now official.

### Pre release usage

* Backup your database!  (Particularly your mf* collections)
* Save your most recent `mfAll.js` translations
* Delete mfExtract.js and the mf* collections, e.g. `meteor shell` and then:
```
> msgfmt.mfStrings.remove({});
337
> msgfmt.mfMeta.remove({});
23
> msgfmt.mfRevisions.remove({});
707
```
* Stop meteor.  Remove gadicohen:messageformat, add
  * msgfmt:core
  * msgfmt:ui
  * msgfmt:extract
* Run Meteor and check that everything is working.