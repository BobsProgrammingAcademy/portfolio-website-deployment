import argparse
import glob
import os
import subprocess
import sys

def install_bs4():
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'bs4'])

try:
    from bs4 import BeautifulSoup
except:
    install_bs4()
    from bs4 import BeautifulSoup


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-d',
        '--dir',
        type=str,
        required=True)
    args = parser.parse_args()
    return args

def search_and_parse(soup, tag):
    for x in soup.find_all(tag):
        if x.get('src') and x['src'].startswith('/_next/'):
            x['src'] = "{% static \"" + x['src'] + "\" %}"
        if x.get('href') and x['href'].startswith('/_next/'):
            x['href'] = "{% static \"" + x['href'] + "\" %}"

def render_html_static():
    args = parse_args()
    for html_file in glob.glob(os.path.join(args.dir, '*html')):
        soup = BeautifulSoup(open(html_file), 'html.parser')
        soup.insert(0, '{% load static %}')
        search_and_parse(soup, 'link')
        search_and_parse(soup, 'script')
        fout = open(html_file, 'wb')
        fout.write(soup.prettify('utf-8'))
        fout.close()

render_html_static()