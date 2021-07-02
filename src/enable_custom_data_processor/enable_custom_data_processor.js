import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import HtmlDataProcessor from "@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor";
import DomConverter from "@ckeditor/ckeditor5-engine/src/view/domconverter";
import BasicHtmlWriter from "@ckeditor/ckeditor5-engine/src/dataprocessor/basichtmlwriter";

export default class EnableCustomDataProcessor extends Plugin {
  constructor( editor ) {
    super( editor );

    editor.data.processor = new CustomDataProcessor( editor.data.viewDocument );
  }
}

class CustomDataProcessor extends HtmlDataProcessor {

  constructor(doc) {
    super(doc)
    this._domConverter = new DomConverter(doc, {blockFillerMode: 'nbsp'});
    this._htmlWriter = new BasicHtmlWriter();
  }

  toData(viewFragment) {
    const entities =
      // Latin-1 entities
      'iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,' +
      'not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,' +
      'cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,' +

      // Symbols
      'fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,' +
      'alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,' +
      'forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,' +
      'radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,' +
      'equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,' +
      'rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,' +

      // Other special characters
      'circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,' +
      'rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,' +
      'euro,' +

      // Latin letters entities
      'Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,' +
      'Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,' +
      'Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,' +
      'agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,' +
      'ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,' +
      'otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,' +
      'OElig,oelig,Scaron,scaron,Yuml,' +

      // Greek letters entities
      'Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,' +
      'Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,' +
      'beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,' +
      'omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,' +
      'upsih,piv';

    const domFragment = this._domConverter.viewToDom(viewFragment, document);

    // Convert DOM DocumentFragment to HTML output.
    let html = this._htmlWriter.getHtml(domFragment);

    const characters = {};
    const entitiesArray = entities.split(',');

    // Create special character -> HTML entity mapping.
    for (const entity of entitiesArray) {
      let div = document.createElement('div');
      div.innerHTML = '&' + entity + ';';
      characters[div.innerHTML] = `&${entity};`;
      div = null;
    }

    // Replace all special characters with HTML entities.
    for (const char in characters) {
      const regex = new RegExp(char, 'g');

      html = html.replace(regex, characters[char]);
    }

    return html;
  }
}
