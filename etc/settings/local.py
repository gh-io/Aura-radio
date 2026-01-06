import sys
globals().update(vars(sys.modules['settings']))

INSTALLED_APPS += ('another_app',)
